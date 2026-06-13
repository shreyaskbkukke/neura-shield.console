import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-navy-50">
      <div className="rounded-full bg-navy-100 p-5">
        <SearchX size={28} className="text-navy-400" />
      </div>
      <div className="text-center space-y-1">
        <h1 className="text-lg font-semibold text-navy-800">Page not found</h1>
        <p className="text-sm text-navy-500">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
      <Link
        href="/dashboard"
        className="text-sm text-brand-600 underline underline-offset-4 hover:text-brand-700"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
