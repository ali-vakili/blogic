import Link from "next/link";
import PostCard from "./PostCard";
import { PostType } from "@/types";

export default function PostList({ posts = [] }: { posts: PostType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Link
          href={`/posts/ps-${post.id}/${post.slug}/`}
          key={post.id}
          className="grid grid-cols-1 gap-5 transition-opacity duration-300 visited:opacity-100 hover:opacity-80"
        >
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
}
