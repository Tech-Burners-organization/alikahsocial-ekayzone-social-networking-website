'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Heart, Send } from 'lucide-react';
import ReusableSheet from '@/components/ui/CustomUi/ReuseableSheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { AllImages } from '../../../../public/images/AllImages';
import type { CommentEntry, CommentReply } from './types';

interface CommentsSheetProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    kind: 'reel' | 'live';
    commentsCount: number;
    comments: CommentEntry[];
}

function CommentRow({ entry }: { entry: CommentReply }) {
    return (
        <div className="flex items-start gap-3">
            <Avatar size="sm">
                <AvatarImage src={entry.avatarUrl} alt={entry.username} />
                <AvatarFallback>{entry.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-base-color">{entry.username}</span>
                    <span className="text-xs text-lighter-color">{entry.timestamp}</span>
                </div>
                <p className="text-sm text-base-color">{entry.text}</p>
                <div className="mt-1 flex items-center gap-4 text-xs text-lighter-color">
                    <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" />
                        {entry.likeCount}
                    </span>
                    <button type="button" className="font-semibold hover:text-secondary-color">
                        Reply
                    </button>
                </div>
            </div>
        </div>
    );
}

export function CommentsSheet({ open, onOpenChange, kind, commentsCount, comments }: CommentsSheetProps) {
    const [entries, setEntries] = useState(comments);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [draft, setDraft] = useState('');

    const toggleReplies = (id: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const handleSend = () => {
        const text = draft.trim();
        if (!text) return;

        setEntries((prev) => [
            {
                id: `local-${Date.now()}`,
                username: 'you',
                avatarUrl: AllImages.profile.src,
                text,
                timestamp: 'now',
                likeCount: 0,
                replies: [],
            },
            ...prev,
        ]);
        setDraft('');
    };

    return (
        <ReusableSheet
            open={open}
            onOpenChange={onOpenChange}
            title={kind === 'live' ? 'Stream Chat' : `${commentsCount} Comments`}
            footer={
                <div className="flex w-full items-center gap-2">
                    <Avatar size="sm">
                        <AvatarImage src={AllImages.profile.src} alt="You" />
                        <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <Input
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') handleSend();
                        }}
                        placeholder="Add a comment..."
                        className="flex-1"
                    />
                    <button
                        type="button"
                        onClick={handleSend}
                        aria-label="Send comment"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-color text-white transition-colors hover:bg-secondary-color/90"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            }
        >
            <div className="flex flex-col gap-4">
                {entries.map((entry) => (
                    <div key={entry.id} className="flex flex-col gap-2">
                        <CommentRow entry={entry} />
                        {entry.replies.length > 0 && (
                            <div className="ml-11 flex flex-col gap-3">
                                <button
                                    type="button"
                                    onClick={() => toggleReplies(entry.id)}
                                    className="flex items-center gap-1 text-xs font-semibold text-lighter-color hover:text-secondary-color"
                                >
                                    {expandedIds.has(entry.id) ? (
                                        <>
                                            <ChevronUp className="h-3.5 w-3.5" />
                                            Hide {entry.replies.length} Replies
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="h-3.5 w-3.5" />
                                            View {entry.replies.length} Replies
                                        </>
                                    )}
                                </button>
                                {expandedIds.has(entry.id) &&
                                    entry.replies.map((reply) => <CommentRow key={reply.id} entry={reply} />)}
                            </div>
                        )}
                    </div>
                ))}
                {entries.length === 0 && (
                    <p className="py-8 text-center text-sm text-lighter-color">
                        {kind === 'live' ? 'No messages yet — say hello!' : 'No comments yet.'}
                    </p>
                )}
            </div>
        </ReusableSheet>
    );
}
