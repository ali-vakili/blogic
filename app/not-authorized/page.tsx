import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

export default function NotAuthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4 font-iran-yekan">
          401
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">
          عدم دسترسی
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          شما دسترسی لازم برای مشاهده این صفحه را ندارید.
        </p>
        <Link
          href="/sign-in"
          className="flex items-center gap-2 w-fit mx-auto bg-blue-500 hover:bg-blue-700 text-white font-normal py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-300 ease-out"
        >
          <span>صفحه ورود</span>
          <span>
            <ArrowUpLeft className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
