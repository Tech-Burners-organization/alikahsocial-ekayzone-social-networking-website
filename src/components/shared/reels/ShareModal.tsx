'use client';

import { Link2, Mail } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaRedditAlien, FaTelegram, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { toast } from 'sonner';
import ReusableModal from '@/components/ui/CustomUi/ReuseableModal';

interface ShareModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    shareUrl: string;
    shareTitle: string;
}

interface ShareTarget {
    name: string;
    Icon: React.ComponentType<{ className?: string }>;
    className: string;
    buildHref: (url: string, title: string) => string;
}

const SHARE_TARGETS: ShareTarget[] = [
    {
        name: 'WhatsApp',
        Icon: FaWhatsapp,
        className: 'bg-[#25D366]',
        buildHref: (url, title) => `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
    {
        name: 'Facebook',
        Icon: FaFacebookF,
        className: 'bg-[#1877F2]',
        buildHref: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
        name: 'X',
        Icon: FaXTwitter,
        className: 'bg-black',
        buildHref: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
        name: 'Telegram',
        Icon: FaTelegram,
        className: 'bg-[#26A5E4]',
        buildHref: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    },
    {
        name: 'LinkedIn',
        Icon: FaLinkedinIn,
        className: 'bg-[#0A66C2]',
        buildHref: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
        name: 'Reddit',
        Icon: FaRedditAlien,
        className: 'bg-[#FF4500]',
        buildHref: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    },
    {
        name: 'Email',
        Icon: Mail,
        className: 'bg-slate-500',
        buildHref: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    },
];

export function ShareModal({ open, onOpenChange, shareUrl, shareTitle }: ShareModalProps) {
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            toast.success('Link copied to clipboard');
        } catch {
            toast.error('Could not copy link');
        }
    };

    return (
        <ReusableModal open={open} onOpenChange={onOpenChange} title="Share">
            <div className="grid grid-cols-4 gap-4">
                {SHARE_TARGETS.map(({ name, Icon, className, buildHref }) => (
                    <a
                        key={name}
                        href={buildHref(shareUrl, shareTitle)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5"
                    >
                        <span className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${className}`}>
                            <Icon className="h-5 w-5" />
                        </span>
                        <span className="text-xs text-base-color">{name}</span>
                    </a>
                ))}
                <button type="button" onClick={handleCopyLink} className="flex flex-col items-center gap-1.5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-input-color text-base-color">
                        <Link2 className="h-5 w-5" />
                    </span>
                    <span className="text-xs text-base-color">Copy Link</span>
                </button>
            </div>
        </ReusableModal>
    );
}
