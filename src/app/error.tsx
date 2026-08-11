"use client";

// Error boundaries must be Client Components

import { useEffect } from "react";
import { AlertTriangle, RotateCcw, Mail } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
  }, [error]);

  const handleContact = () => {
    // Open email client with error details
    const subject = encodeURIComponent("Error Report");
    const body = encodeURIComponent(
      `Error: ${error.message}\nDigest: ${error.digest || "N/A"}`
    );
    window.location.href = `mailto:support@yourcompany.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Main Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute -top-4 -right-4 w-24 h-24 rounded-full"
              style={{ backgroundColor: "#10b981" }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full"
              style={{ backgroundColor: "#10b981" }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Error Icon */}
            <div
              className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: "#10b981", opacity: 0.1 }}
            >
              <AlertTriangle
                className="w-10 h-10"
                style={{ color: "#10b981" }}
              />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Oops! Something went wrong
            </h1>

            {/* Error Message */}
            <p className="text-gray-600 mb-2 leading-relaxed">
              We encountered an unexpected error. Don&apos;t worry, our team has
              been notified and we&apos;re working to fix it.
            </p>

            {/* Error Details (for development) */}
            {process.env.NODE_ENV === "development" && (
              <div className="bg-gray-50 rounded-lg p-3 mb-6 text-left">
                <p className="text-sm text-gray-500 mb-1">Error Details:</p>
                <p className="text-sm text-gray-700 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-sm text-gray-500 mt-1">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 mt-8">
              <button
                onClick={reset}
                className="w-full text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: "#10b981" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#10b981")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#10b981")
                }
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>

            {/* Contact Support */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-3">
                Still having trouble?
              </p>
              <button
                onClick={handleContact}
                className="font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-1 mx-auto cursor-pointer"
                style={{ color: "#10b981" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#10b981")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#10b981")
                }
              >
                <Mail className="w-4 h-4" />
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            {error.digest && (
              <>
                Error ID:{" "}
                <span className="font-mono">{error.digest}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}