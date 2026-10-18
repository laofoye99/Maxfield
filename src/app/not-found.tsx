import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-40 text-center">
      <h1 className="text-6xl font-bold text-gray-200 dark:text-gray-800 mb-4">
        404
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="text-sm text-brand font-medium hover:underline"
      >
        Back to home
      </Link>
    </div>
  );
}