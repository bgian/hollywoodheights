# Hollywood Heights Association

Website for the [Hollywood Heights Association](https://hollywoodheights.org), a non-profit dedicated to the betterment of the Hollywood Heights neighborhood in Los Angeles.

## Stack

- **Next.js 15** (App Router) on Vercel
- **Tailwind CSS v4**
- **Sanity CMS** for blog/news content
- **Google Calendar ICS** for events
- **Statius** custom serif typeface

## Getting Started

```bash
npm install
cp .env.example .env.local
# Fill in your Sanity project ID
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (default: `production`) |
| `SANITY_API_WRITE_TOKEN` | Sanity token with write access (stores rotating Constant Contact OAuth tokens) |
| `CONSTANT_CONTACT_CLIENT_ID` | Constant Contact developer app API key |
| `CONSTANT_CONTACT_CLIENT_SECRET` | Constant Contact developer app secret |

## Constant Contact Setup

Newsletter signup on the Contact page links out to a [Constant Contact hosted landing page](https://lp.constantcontactpages.com/sl/fIheEaU), so it needs no configuration. The "Past Newsletters" section uses the Constant Contact v3 API:

1. Create an application in the [Constant Contact developer portal](https://app.constantcontact.com/pages/dma/portal/) using the **Authorization Code Flow**, with `http://localhost:8976/callback` as the redirect URI. Copy the API key and secret into `.env.local`.
2. Create a Sanity token with **Editor** access at [sanity.io/manage](https://www.sanity.io/manage) and set it as `SANITY_API_WRITE_TOKEN`. Constant Contact refresh tokens are single-use, so the current token set is persisted in a Sanity document (`private.constantContactAuth`) that the app rotates automatically. The `private.` ID prefix means it can only be read with an authenticated token, and the type is not registered in the Studio schema, so it never appears in the Studio UI.
3. Run `npm run cc:auth` and log in as the association's Constant Contact account to authorize the app. This stores the initial tokens in Sanity.
4. Set all three variables in Vercel as well. The one-time `cc:auth` step does not need to be repeated for deployments since tokens live in Sanity.

Past newsletters are pulled from sent campaigns (with their permanent web-version links) and cached for one hour. If Constant Contact is unreachable or unconfigured, the section is simply hidden.

## Sanity CMS Setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy the project ID into `.env.local`
3. Access the Studio at `/studio` to manage content

### Content Types

- **Post** -- Blog/news articles with rich text
- **Page** -- Generic pages with content sections
- **Board Member** -- Board of directors listing
- **Site Settings** -- Global configuration (address, social links, etc.)

## Deployment

Push to GitHub and connect the repo to [Vercel](https://vercel.com). Set the environment variables in the Vercel dashboard.

The Google Calendar events feed is fetched server-side and cached for 15 minutes.
