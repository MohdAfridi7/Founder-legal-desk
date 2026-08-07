const BASE_URL = "https://founderslegaldesk.com";

// TODO: replace this with your actual backend API endpoint that returns blog posts
// Expected shape (adjust to match your API): [{ slug: "my-post", updatedAt: "2026-08-01" }, ...]
async function getBlogPosts() {
  try {
    const res = await fetch(`${BASE_URL}/api/blogs`, {
      // revalidate every hour so new posts show up in the sitemap without a redeploy
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const posts = await res.json();
    return posts;
  } catch (error) {
    console.error("Failed to fetch blog posts for sitemap:", error);
    return [];
  }
}

export default async function sitemap() {
  // Static pages
  const staticRoutes = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic blog post pages
  const posts = await getBlogPosts();

  const blogRoutes = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}