import PostType from "./post";

interface FetchError extends Error {
  message: string;
  status?: number;
}

export type { PostType, FetchError };
