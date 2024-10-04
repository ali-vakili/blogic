const baseUrl =
  process.env.NODE_ENV === "production"
    ? new URL(
        process.env.NEXT_PUBLIC_NEXT_PRODUCTION_URL ||
          "https://blogic-next.vercel.app"
      )
    : new URL(process.env.NEXT_PUBLIC_NEXT_DEV_URL || "http://localhost:3000");

export const openGraphImages = {
  type: "website",
  url: `${baseUrl}`,
  title: {
    default: "Blogic | بلاگیک",
    template: "Blogic | %s | بلاگیک",
  },
  locale: "fa_IR",
  description: "پلتفرم مورد علاقه شما برای مقالات روشنگر و محتوای جذاب",
  siteName: "Blogic",
  images: [
    {
      url: "/opengraph-image.jpg",
      secureUrl: `${baseUrl}/opengraph-image.jpg`,
      width: 1200,
      height: 630,
      alt: "پلتفرم مورد علاقه شما برای مقالات روشنگر و محتوای جذاب",
      type: "image/jpg",
    },
  ],
};

export const twitterImages = {
  title: {
    default: "Blogic | بلاگیک",
    template: "Blogic | %s | بلاگیک",
  },
  description: "پلتفرم مورد علاقه شما برای مقالات روشنگر و محتوای جذاب",
  images: [
    {
      url: "/opengraph-image.jpg",
      width: 1200,
      height: 630,
      alt: "پلتفرم مورد علاقه شما برای مقالات روشنگر و محتوای جذاب",
      type: "image/jpg",
    },
  ],
};
