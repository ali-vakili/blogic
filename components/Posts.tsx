"use client";

import PostList from "@/components/PostList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";
import { fetchPosts } from "@/lib/api/getPosts";
import { CircleAlert } from "lucide-react";
import { FetchError, PostType } from "@/types";

const Posts = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<PostType[], FetchError>(["posts"], fetchPosts, {
    retry: (failureCount, error) => {
      if (error.status === 401) {
        return false;
      }
      return failureCount < 3;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["authStatus"]);
    },
    onError: (error) => {
      if (error.status === 401) {
        router.push("/not-authorized");
      }
    },
  });

  if (error) {
    return (
      <div className="pt-32 px-4 py-8">
        <div className="rounded-lg w-fit bg-red-200 text-red-600 py-2 px-4 mx-auto space-y-1">
          <p className="flex items-center gap-2 text-lg">
            <CircleAlert className="text-red-600 h-6 w-6" />
            مشکلی در گرفتن اطلاعات پیش آمده.
          </p>
          <p className="text-center text-sm">لطفا بعدا تلاش کنید.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto pt-32 px-4 py-8 space-y-6 lg:space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold font-iran-yekan">
        لیست بلاگ ها
      </h1>
      {isLoading ? <SkeletonLoading /> : <PostList posts={posts} />}
    </div>
  );
};

const SkeletonLoading = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-56 w-full rounded-3xl" />
            <Skeleton className="h-6 w-full rounded-lg" />
            <Skeleton className="h-6 w-1/4 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
