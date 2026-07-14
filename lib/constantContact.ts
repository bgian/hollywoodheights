import { createClient, type SanityClient } from "next-sanity";

/**
 * Constant Contact v3 API client.
 *
 * Auth model: the v3 API uses OAuth2 where refresh tokens are single-use —
 * every refresh returns a NEW refresh token and invalidates the old one.
 * Since Vercel has no writable disk, the current token set is persisted in a
 * Sanity document. The document ID uses a path prefix (`private.`), which
 * Sanity treats as non-public: it is only readable with an authenticated
 * token, even in public datasets. Seed it once with `npm run cc:auth`.
 */

const AUTH_TOKEN_URL = "https://authz.constantcontact.com/oauth2/default/v1/token";
const API_BASE = "https://api.cc.email/v3";

export const TOKEN_DOC_ID = "private.constantContactAuth";

const clientId = process.env.CONSTANT_CONTACT_CLIENT_ID;
const clientSecret = process.env.CONSTANT_CONTACT_CLIENT_SECRET;
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityWriteToken = process.env.SANITY_API_WRITE_TOKEN;

export const isConstantContactConfigured = Boolean(
  clientId && clientSecret && sanityProjectId && sanityWriteToken
);

// Token reads/writes must bypass the CDN and be authenticated.
const tokenStore: SanityClient = isConstantContactConfigured
  ? createClient({
      projectId: sanityProjectId!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: sanityWriteToken,
    })
  : (null as unknown as SanityClient);

interface StoredTokens {
  accessToken: string;
  refreshToken: string;
  /** Unix ms timestamp when the access token expires. */
  expiresAt: number;
}

// Refresh slightly early so a token never expires mid-request.
const EXPIRY_BUFFER_MS = 5 * 60 * 1000;

// Warm-lambda cache to avoid a Sanity round trip on every call.
let memoryTokens: StoredTokens | null = null;

function tokensAreFresh(tokens: StoredTokens): boolean {
  return Date.now() < tokens.expiresAt - EXPIRY_BUFFER_MS;
}

async function refreshTokens(refreshToken: string): Promise<StoredTokens> {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(AUTH_TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Constant Contact token refresh failed (${res.status}). Re-run \`npm run cc:auth\` if the refresh token was invalidated.`
    );
  }

  const data: { access_token: string; refresh_token: string; expires_in: number } =
    await res.json();

  const tokens: StoredTokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  // Last-write-wins. Concurrent refreshes are rare on this low-traffic site,
  // and Constant Contact tolerates a single reuse of the previous token.
  await tokenStore.createOrReplace({
    _id: TOKEN_DOC_ID,
    _type: "constantContactAuth",
    ...tokens,
  });

  return tokens;
}

async function getAccessToken(): Promise<string> {
  if (!isConstantContactConfigured) {
    throw new Error("Constant Contact is not configured (missing env vars).");
  }

  if (memoryTokens && tokensAreFresh(memoryTokens)) {
    return memoryTokens.accessToken;
  }

  const stored = await tokenStore.fetch<StoredTokens | null>(
    `*[_id == $id][0]{ accessToken, refreshToken, expiresAt }`,
    { id: TOKEN_DOC_ID },
    { cache: "no-store" }
  );

  if (!stored?.refreshToken) {
    throw new Error(
      "Constant Contact tokens not found in Sanity. Run `npm run cc:auth` to authorize."
    );
  }

  memoryTokens = tokensAreFresh(stored) ? stored : await refreshTokens(stored.refreshToken);
  return memoryTokens.accessToken;
}

async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  const accessToken = await getAccessToken();
  return fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}

export interface SentNewsletter {
  id: string;
  name: string;
  sentAt: string;
  url: string;
}

interface CampaignSummary {
  campaign_id: string;
  name: string;
  current_status: string;
  updated_at: string;
}

interface CampaignActivitySummary {
  campaign_activity_id: string;
  role: string;
}

const NEWSLETTER_REVALIDATE_SECONDS = 3600;

/**
 * Returns the most recently sent email campaigns with their permanent
 * web-version URLs. Results are cached and revalidated hourly.
 */
export async function getRecentNewsletters(limit = 9): Promise<SentNewsletter[]> {
  if (!isConstantContactConfigured) return [];

  try {
    const listRes = await apiFetch("/emails?limit=50", {
      next: { revalidate: NEWSLETTER_REVALIDATE_SECONDS },
    });
    if (!listRes.ok) throw new Error(`GET /emails failed (${listRes.status})`);

    const { campaigns = [] }: { campaigns?: CampaignSummary[] } = await listRes.json();
    const sent = campaigns
      .filter((c) => c.current_status.toUpperCase() === "DONE")
      .slice(0, limit);

    // Sequential on purpose: Constant Contact throttles at ~4 req/s, and
    // these responses are cached for an hour anyway.
    const newsletters: SentNewsletter[] = [];
    for (const campaign of sent) {
      const detailRes = await apiFetch(`/emails/${campaign.campaign_id}`, {
        next: { revalidate: NEWSLETTER_REVALIDATE_SECONDS },
      });
      if (!detailRes.ok) continue;

      const detail: { campaign_activities?: CampaignActivitySummary[] } =
        await detailRes.json();
      const permalinkActivity = detail.campaign_activities?.find(
        (a) => a.role === "permalink"
      );
      if (!permalinkActivity) continue;

      const activityRes = await apiFetch(
        `/emails/activities/${permalinkActivity.campaign_activity_id}?include=permalink_url`,
        { next: { revalidate: NEWSLETTER_REVALIDATE_SECONDS } }
      );
      if (!activityRes.ok) continue;

      const activity: { permalink_url?: string } = await activityRes.json();
      if (!activity.permalink_url) continue;

      newsletters.push({
        id: campaign.campaign_id,
        name: campaign.name,
        sentAt: campaign.updated_at,
        url: activity.permalink_url,
      });
    }

    return newsletters;
  } catch (error) {
    // Never let a Constant Contact outage break the Contact page.
    console.error("Failed to load past newsletters:", error);
    return [];
  }
}
