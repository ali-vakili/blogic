import PostDetail from "@/components/PostDetail";
import { fetchPost } from "@/lib/api/getPosts";
import { extractIdFromSlug } from "@/utils";
import { stripHtml } from "@/utils/stripHtml";
import { PostType } from "@/types";

type PostPagePropType = {
  params: {
    slug: string[];
  };
};

export const generateMetadata = async ({
  params: { slug },
}: PostPagePropType) => {
  const id = extractIdFromSlug(slug[0]);
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? new URL(
          process.env.NEXT_PUBLIC_NEXT_PRODUCTION_URL ||
            "https://blogic-next.vercel.app"
        )
      : new URL(
          process.env.NEXT_PUBLIC_NEXT_DEV_URL || "http://localhost:3000"
        );
  const post: PostType = await fetchPost(id, true);

  if (!post) {
    return {
      title: {
        absolute: "بلاگ پیدا نشد.",
      },
    };
  }

  const cleanExcerpt = stripHtml(post?.excerpt.rendered);

  return {
    title: {
      absolute: `${post?.title.rendered}`,
    },
    description: cleanExcerpt,
    keywords: post?.categories.map((p) => [p.name, p.slug]),
    alternates: {
      canonical: `/posts/ps-${post?.id}/${post?.title.rendered}`,
      languages: {
        "fa-IR": `/posts/ps-${post?.id}/${post?.title.rendered}/fa-IR`,
      },
    },
    openGraph: {
      title: {
        absolute: `${post?.title.rendered}`,
      },
      locale: "fa_IR",
      description: cleanExcerpt,
      siteName: "Blogic",
      type: "website",
      url: `${baseUrl}/post/ps-${post?.id}/${post?.slug}`,
      images: [
        {
          url: `${post.featured_media_object.source_url}`,
          width: 740,
          height: 440,
          alt: `${post?.title.rendered}`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      title: {
        absolute: `${post?.title.rendered}`,
      },
      description: cleanExcerpt,
      images: [
        {
          url: `${post.featured_media_object.source_url}`,
          width: 740,
          height: 440,
          alt: `${post?.title.rendered}`,
          type: "image/png",
        },
      ],
    },
  };
};

export default function PostPage({ params: { slug } }: PostPagePropType) {
  const id = extractIdFromSlug(slug[0]);

  return <PostDetail id={id} />;
}
