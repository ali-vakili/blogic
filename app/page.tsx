import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100">
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in-down">
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-4">
              <span className="text-indigo-600 font-iran-yekan">بلاگیک</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8">
              پلتفرم مورد علاقه شما برای مقالات روشنگر و محتوای جذاب
            </p>
          </div>
          <div className="flex justify-center animate-fade-in-up">
            <Link
              href="/posts"
              className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
            >
              مشاهده بلاگ ها
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
