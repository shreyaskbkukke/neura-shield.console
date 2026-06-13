import Link from "next/link";
import { SearchX, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/foundation/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-navy-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-brand-500/10 blur-[128px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-intelligence-500/10 blur-[128px] pointer-events-none" />

      <div className="w-full max-w-md text-center space-y-8 relative z-10">
        {/* Animated Icon Container */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-navy-900 border border-navy-800 shadow-xl relative group">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-brand-500/20 to-intelligence-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <SearchX size={36} className="text-brand-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-5xl font-extrabold text-white tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-navy-100">Page not found</h2>
          <p className="text-sm text-navy-400 max-w-sm mx-auto leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been moved to a different sector.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link href="/dashboard" passHref className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto gap-2" size="md">
              <Home size={15} />
              Return Dashboard
            </Button>
          </Link>
          <Link href="/dashboard" passHref className="w-full sm:w-auto">
            <Button variant="outline" className="w-full sm:w-auto gap-2 border-navy-700 hover:border-navy-600 bg-navy-900 text-navy-200 hover:text-white" size="md">
              <ArrowLeft size={15} />
              Go Back
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
