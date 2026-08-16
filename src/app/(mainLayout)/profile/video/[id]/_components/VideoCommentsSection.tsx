"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, Heart, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CommentEntry } from "@/components/shared/reels/types";

function CommentRow({ comment }: { comment: CommentEntry }) {
    const [showReplies, setShowReplies] = useState(false);

    return (
        <div className="flex gap-3 py-3.5">
            <div className="relative size-[38px] shrink-0 overflow-hidden rounded-full bg-muted">
                <Image src={comment.avatarUrl} alt={comment.username} fill sizes="38px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <span className="text-sm font-semibold text-foreground">{comment.username}</span>
                        <span className="mx-1.5 text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                        <p className="mt-1 text-base text-foreground">{comment.text}</p>
                    </div>
                    <MoreVertical className="size-5 shrink-0 text-muted-foreground" />
                </div>

                <div className="mt-3 flex items-center gap-4 text-sm font-semibold text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Heart className="size-4" />
                        {comment.likeCount}
                    </span>
                    <span>Reply</span>
                </div>

                {comment.replies.length > 0 && (
                    <button
                        type="button"
                        onClick={() => setShowReplies((prev) => !prev)}
                        className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-secondary-color"
                    >
                        <ChevronDown className={cn("size-4 transition-transform", showReplies && "rotate-180")} />
                        {showReplies ? "Hide Replies" : `View ${comment.replies.length} Replies`}
                    </button>
                )}

                {showReplies && (
                    <div className="mt-3 flex flex-col gap-3 border-l-2 border-border pl-3">
                        {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-2.5">
                                <div className="relative size-7 shrink-0 overflow-hidden rounded-full bg-muted">
                                    <Image src={reply.avatarUrl} alt={reply.username} fill sizes="28px" className="object-cover" />
                                </div>
                                <div>
                                    <span className="text-xs font-semibold text-foreground">{reply.username}</span>
                                    <span className="mx-1 text-[10px] text-muted-foreground">·</span>
                                    <span className="text-[10px] text-muted-foreground">{reply.timestamp}</span>
                                    <p className="text-sm text-foreground">{reply.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VideoCommentsSection({ comments }: { comments: CommentEntry[] }) {
    return (
        <div className="rounded-xl border border-border bg-background p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between px-1.5 py-2">
                <h2 className="text-lg font-bold text-foreground">Comments</h2>
                <span className="cursor-pointer text-sm font-bold text-secondary-color hover:underline">View All</span>
            </div>
            <div className="flex flex-col divide-y divide-border px-1.5">
                {comments.map((comment) => (
                    <CommentRow key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
