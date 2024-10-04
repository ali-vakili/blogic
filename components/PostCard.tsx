import Image from "next/image";
import { PostType } from "@/types";
import PostTag from "./PostTag";

export default function PostCard({ post }: { post: PostType }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {post.featured_media_object && (
        <div className="relative bg-gray-100 aspect-[3/2] w-full overflow-hidden rounded-3xl md:rounded-3xl">
          <Image
            src={post.featured_media_object.source_url}
            alt={post.title.rendered}
            fill
            className="bg-gray-11 object-cover"
          />
        </div>
      )}
      <div className="p-4 space-y-2">
        <h2
          className="text-lg sm:text-xl font-semibold mb-2 font-iran-yekan text-nowrap overflow-hidden text-ellipsis"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <PostTag categories={post.categories} />
        <div
          className="text-gray-600 text-justify"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
      </div>
    </div>
  );
}
