"use client";

import Image from "next/image";
import PostTag from "@/components/PostTag";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";
import { ArrowRight, CircleAlert } from "lucide-react";
import { formatDate } from "@/utils";
import { FetchError, PostType } from "@/types";
import { fetchPost } from "@/lib/api/getPosts";

const PostDetail = ({ id }: { id: string }) => {
  const router = useRouter();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<PostType, FetchError>(["post", id], () => fetchPost(id), {
    retry: (failureCount, error) => {
      if (error.status === 401) {
        return false;
      }
      return failureCount < 3;
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
    <div className="container max-w-5xl mx-auto relative flex flex-col justify-center lg:gap-12 sm:gap-8 gap-6 px-5 pt-32 pb-16 md:px-12 md:pt-36 lg:px-16 lg:pt-36">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center justify-center rounded-full h-8 w-8 backdrop-blur-xs bg-gray-100 hover:bg-gray-200 transition-colors duration-150 ease-out"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <div className="text-sm text-gray-800">{formatDate(post.date)}</div>
            <h1 className="lg:text-3xl sm:text-xl text-lg font-bold font-iran-yekan">
              {post.title.rendered}
            </h1>
          </div>
          <div className="space-y-3">
            {post.featured_media_object && (
              <div className="relative aspect-video bg-gray-100 w-full overflow-hidden rounded-[20px] md:rounded-3xl">
                <Image
                  src={post.featured_media_object.source_url}
                  alt={post.title.rendered}
                  fill
                  className="w-full mb-6 rounded-lg"
                />
              </div>
            )}
            <PostTag categories={post.categories} />
            <div
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              className="prose max-w-none text-justify sm:text-lg text-sm"
            />
          </div>
        </>
      )}
    </div>
  );
};

const SkeletonLoading = () => {
  return (
    <div className="w-full space-y-6">
      <Skeleton className="h-4 w-20 rounded-lg" />
      <Skeleton className="h-6 w-64 rounded-lg" />
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <Skeleton className="md:h-96 h-52 w-full rounded-3xl" />
          <Skeleton className="h-4 w-20 rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
