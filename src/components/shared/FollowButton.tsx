"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFollowing((prev) => !prev)}
      className={cn(
        "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
        following
          ? "bg-slate-100 text-slate-600 hover:bg-slate-200"
          : "bg-secondary-color text-white hover:bg-secondary-color/90"
      )}
    >
      {following ? "Following" : "Follow"}
    </button>
  );
}
