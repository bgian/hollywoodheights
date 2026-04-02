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
