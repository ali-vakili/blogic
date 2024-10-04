"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { signOut } from "@/app/sign-in/action";

const fetchAuthStatus = async () => {
  const response = await fetch("/api/auth/check");
  if (!response.ok) {
    throw new Error("Failed to fetch authentication status");
  }
  return response.json();
};

const LoadingSkeleton = () => (
  <div className="animate-pulse bg-gray-200 h-8 w-16 rounded-lg"></div>
);

const Navbar = () => {
  const { data, isLoading, refetch } = useQuery(
    ["authStatus"],
    fetchAuthStatus
  );

  const handleSignOut = async () => {
    await signOut();
    refetch();
  };

  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-sm px-3">
      <div className="flex items-center justify-between rounded-2xl bg-white/80 shadow-sm px-6 py-3 backdrop-blur-sm border border-gray-100">
        <div className="flex items-center">
          {isLoading ? (
            <LoadingSkeleton />
          ) : data?.authenticated ? (
            <button
              onClick={handleSignOut}
              className="text-gray-900 py-1 px-3 bg-red-200 rounded-lg hover:bg-red-300 transition-colors duration-300 ease-out"
            >
              خروج
            </button>
          ) : (
            <Link
              href="/sign-in"
              className="text-white py-1 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 ease-out"
            >
              ورود
            </Link>
          )}
          <Link
            href="/posts"
            className="text-gray-600 hover:underline hover:text-indigo-600 transition-colors ms-4"
          >
            بلاگ ها
          </Link>
        </div>
        <Link
          href="/"
          className="text-2xl font-bold font-iran-yekan text-indigo-600 transition-colors hover:text-indigo-800"
        >
          بلاگیک
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
