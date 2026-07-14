/**
 * One-time Constant Contact OAuth bootstrap.
 *
 * Runs the OAuth2 Authorization Code flow locally, then stores the resulting
 * token set in Sanity (private document `private.constantContactAuth`), where
 * the app reads and rotates it from then on.
 *
 * Usage:
 *   1. Register an app at https://app.constantcontact.com/pages/dma/portal/
 *      with redirect URI http://localhost:8976/callback
 *   2. Put CONSTANT_CONTACT_CLIENT_ID, CONSTANT_CONTACT_CLIENT_SECRET,
 *      NEXT_PUBLIC_SANITY_PROJECT_ID, and SANITY_API_WRITE_TOKEN in .env.local
 *   3. npm run cc:auth
 */

import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { exec } from "node:child_process";

const PORT = 8976;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;
const SCOPES = "campaign_data offline_access";
const AUTHORIZE_URL = "https://authz.constantcontact.com/oauth2/default/v1/authorize";
const TOKEN_URL = "https://authz.constantcontact.com/oauth2/default/v1/token";

function loadEnvLocal() {
  try {
    for (const line of readFileSync(".env.local", "utf8").split("\n")) {
      const match = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
      if (match && !(match[1] in process.env)) {
        process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // .env.local is optional; env vars may come from the shell.
  }
}

loadEnvLocal();

const clientId = process.env.CONSTANT_CONTACT_CLIENT_ID;
const clientSecret = process.env.CONSTANT_CONTACT_CLIENT_SECRET;
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const sanityWriteToken = process.env.SANITY_API_WRITE_TOKEN;

const missing = Object.entries({
  CONSTANT_CONTACT_CLIENT_ID: clientId,
  CONSTANT_CONTACT_CLIENT_SECRET: clientSecret,
  NEXT_PUBLIC_SANITY_PROJECT_ID: sanityProjectId,
  SANITY_API_WRITE_TOKEN: sanityWriteToken,
})
  .filter(([, value]) => !value)
  .map(([key]) => key);

if (missing.length > 0) {
  console.error(`Missing env vars in .env.local: ${missing.join(", ")}`);
  process.exit(1);
}

const state = randomBytes(16).toString("hex");
const authorizeUrl = `${AUTHORIZE_URL}?${new URLSearchParams({
  client_id: clientId,
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope: SCOPES,
  state,
})}`;

async function exchangeCode(code) {
  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });
  if (!res.ok) {
    throw new Error(`Token exchange failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

async function storeTokensInSanity(tokens) {
  const res = await fetch(
    `https://${sanityProjectId}.api.sanity.io/v2024-01-01/data/mutate/${sanityDataset}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sanityWriteToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mutations: [
          {
            createOrReplace: {
              // The "private." path prefix makes the document unreadable
              // without an authenticated Sanity token, even in public datasets.
              _id: "private.constantContactAuth",
              _type: "constantContactAuth",
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
              expiresAt: Date.now() + tokens.expires_in * 1000,
            },
          },
        ],
      }),
    }
  );
  if (!res.ok) {
    throw new Error(`Sanity write failed (${res.status}): ${await res.text()}`);
  }
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  if (url.pathname !== "/callback") {
    res.writeHead(404).end();
    return;
  }

  try {
    if (url.searchParams.get("state") !== state) {
      throw new Error("OAuth state mismatch — try again.");
    }
    const error = url.searchParams.get("error");
    if (error) {
      throw new Error(`Authorization denied: ${error}`);
    }

    const tokens = await exchangeCode(url.searchParams.get("code"));
    await storeTokensInSanity(tokens);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Done!</h1><p>Constant Contact is connected. You can close this tab.</p>");
    console.log("Tokens stored in Sanity. Constant Contact is ready to use.");
    server.close();
  } catch (err) {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(String(err));
    console.error(err);
    server.close();
    process.exitCode = 1;
  }
});

server.listen(PORT, () => {
  console.log("Opening Constant Contact authorization page...");
  console.log(`If the browser does not open, visit:\n\n${authorizeUrl}\n`);
  const opener =
    process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  exec(`${opener} "${authorizeUrl}"`);
});
