import { client, isSanityConfigured } from "./client";

export async function getPosts(limit?: number) {
  if (!isSanityConfigured) return [];
  const query = `*[_type == "post"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ""} {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    mainImage {
      asset->{url},
      alt
    }
  }`;
  return client.fetch(query);
}

export async function getPost(slug: string) {
  if (!isSanityConfigured) return null;
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    mainImage {
      asset->{url},
      alt
    }
  }`;
  return client.fetch(query, { slug });
}

export async function getPage(slug: string) {
  if (!isSanityConfigured) return null;
  const query = `*[_type == "page" && slug.current == $slug][0] {
    _id,
    title,
    sections[] {
      heading,
      body,
      image {
        asset->{url},
        alt
      }
    }
  }`;
  return client.fetch(query, { slug });
}

export async function getBoardMembers() {
  if (!isSanityConfigured) return [];
  const query = `*[_type == "boardMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo {
      asset->{url}
    }
  }`;
  return client.fetch(query);
}

export async function getSiteSettings() {
  if (!isSanityConfigured) return null;
  const query = `*[_type == "siteSettings"][0] {
    title,
    description,
    address,
    email,
    instagramUrl,
    facebookUrl,
    membershipUrl,
    newsletterUrl
  }`;
  return client.fetch(query);
}
