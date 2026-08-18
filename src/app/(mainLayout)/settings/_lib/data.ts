import {
    Ban,
    Bell,
    Crown,
    Eye,
    Headset,
    HelpCircle,
    Info,
    Mail,
    MessageSquare,
    MessageSquareText,
    ShieldCheck,
    Ticket,
    UserRound,
    type LucideIcon,
} from "lucide-react";

export interface SettingsNavItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

export interface SettingsSectionConfig {
    title: string;
    items: SettingsNavItem[];
    /** Static, non-navigable row rendered at the end of the section (e.g. the version string). */
    footerRow?: { label: string; icon: LucideIcon };
}

export const SETTINGS_SECTIONS: SettingsSectionConfig[] = [
    {
        title: "ACCOUNT",
        items: [
            { label: "Edit Profile", href: "/settings/edit-profile", icon: UserRound },
            { label: "Password & Security", href: "/settings/password-security", icon: ShieldCheck },
            { label: "Notifications", href: "/settings/notifications", icon: Bell },
        ],
    },
    {
        title: "PRIVACY",
        items: [
            { label: "Account Visibility", href: "/settings/account-visibility", icon: Eye },
            { label: "Comments & Messages", href: "/settings/comments-messages", icon: MessageSquare },
            { label: "Blocked Users", href: "/settings/blocked-users", icon: Ban },
        ],
    },
    {
        title: "SUBSCRIPTION",
        items: [{ label: "Manage Subscription", href: "/settings/subscription", icon: Crown }],
    },
    {
        title: "SUPPORT & ABOUT",
        items: [
            { label: "Help Centre", href: "/settings/help-centre", icon: HelpCircle },
            { label: "System & Legal", href: "/settings/system-legal", icon: ShieldCheck },
        ],
        footerRow: { label: "Version 1.0.0", icon: Info },
    },
];

/* ─── Notifications ────────────────────────────────────────── */

export const NOTIFICATION_CHANNELS: SettingsNavItem[] = [
    { label: "Email Notifications", href: "/settings/notifications/email", icon: Mail },
    { label: "SMS Notifications", href: "/settings/notifications/sms", icon: MessageSquareText },
];

export interface NotificationPreference {
    label: string;
    description?: string;
    defaultChecked?: boolean;
    /** Mandatory messages the user cannot opt out of — shown as a dimmed, always-on toggle. */
    locked?: boolean;
}

export interface NotificationChannel {
    /** Copy for the standalone master-toggle card at the top of the page. */
    master: NotificationPreference;
    preferences: NotificationPreference[];
}

export const EMAIL_NOTIFICATIONS: NotificationChannel = {
    master: { label: "Email Notifications", description: "Master toggle", defaultChecked: true },
    preferences: [
        { label: "Order Confirmations & Receipts", locked: true },
        { label: "Shipping & Delivery Updates", defaultChecked: true },
        {
            label: "Marketing & Promotions",
            description: "Weekly newsletter, new features",
            defaultChecked: true,
        },
        {
            label: "Security Alerts",
            description: "New login from unrecognised device",
            locked: true,
        },
        { label: "Subscription Billing Reminders", defaultChecked: true },
        {
            label: "Comments",
            description: "Someone commented on your video",
            defaultChecked: true,
        },
    ],
};

export const SMS_NOTIFICATIONS: NotificationChannel = {
    master: { label: "SMS Notifications", description: "Off by default", defaultChecked: false },
    preferences: [
        { label: "OTP Codes", locked: true },
        { label: "Order Dispatched" },
        { label: "Booking Reminders" },
    ],
};

/* ─── Profile ──────────────────────────────────────────────── */

export interface SettingsProfile {
    fullName: string;
    userName: string;
    email: string;
    phone: string;
    bio: string;
    avatarUrl: string;
}

export function getSettingsProfile(): SettingsProfile {
    return {
        fullName: "Thabo Mokoena",
        userName: "thabo_mokoena",
        email: "thabo@gmail.com",
        phone: "+27 82 345 6789",
        bio: "Just someone who enjoys discovering new ideas, meeting different people, and learning something useful every day. Trying to stay positive and keep moving forward.",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=240&h=240&fit=crop",
    };
}

/* ─── Connected accounts ───────────────────────────────────── */

export interface ConnectedAccount {
    id: string;
    provider: "google" | "apple";
    label: string;
    account?: string;
    connected: boolean;
}

export function getConnectedAccounts(): ConnectedAccount[] {
    return [
        { id: "google", provider: "google", label: "Google", account: "thabo@gmail.com", connected: true },
        { id: "apple", provider: "apple", label: "Apple", connected: false },
    ];
}

/* ─── Blocked users ────────────────────────────────────────── */

export interface BlockedUser {
    id: string;
    name: string;
    handle: string;
    avatar: string;
}

const BLOCKED_USERS: BlockedUser[] = [
    {
        id: "b1",
        name: "Joey Delgado",
        handle: "@imjoey",
        avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=120&h=120&fit=crop",
    },
    {
        id: "b2",
        name: "Amada De Santa",
        handle: "@amnda01",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
    },
];

export function getBlockedUsers(search: string): BlockedUser[] {
    const query = search.trim().toLowerCase();
    if (query.length === 0) return BLOCKED_USERS;

    return BLOCKED_USERS.filter(
        (user) =>
            user.name.toLowerCase().includes(query) || user.handle.toLowerCase().includes(query)
    );
}

/* ─── Subscription ─────────────────────────────────────────── */

export interface SubscriptionPlan {
    name: string;
    priceLabel?: string;
    features: string[];
}

export function getCurrentPlan(): SubscriptionPlan {
    return {
        name: "Free tier",
        features: ["Up to 5 marketplace listings", "Basic video analytics", "Standard support"],
    };
}

export function getUpgradePlan(): SubscriptionPlan {
    return {
        name: "Upgrade to Pro",
        priceLabel: "From R66.58/month",
        features: [
            "Unlimited marketplace listings",
            "Video promote campaigns",
            "Basic video analytics",
            "AI listing writing assistant",
            "Creator analytics dashboard",
        ],
    };
}

/* ─── Help Centre ──────────────────────────────────────────── */

export interface HelpCentreLink extends SettingsNavItem {
    /** Count shown in the pill at the end of the row (My Tickets). */
    badge?: number;
}

export const HELP_CENTRE_LINKS: HelpCentreLink[] = [
    { label: "Contact Support", href: "/settings/help-centre/contact-support", icon: Headset },
    { label: "My Tickets", href: "/settings/help-centre/tickets", icon: Ticket, badge: 2 },
    { label: "Send Feedback", href: "/settings/help-centre/feedback", icon: MessageSquare },
];

export interface FaqItem {
    question: string;
    answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
    {
        question: "Do I pay before or after booking a guard?",
        answer:
            "Payment is made upfront when booking a guard. This ensures the guard's availability and confirmation of service.",
    },
    {
        question: "What happens after I book a guard?",
        answer:
            "You'll receive a confirmation with the guard's details, and they'll be in touch to arrange arrival time and any access requirements.",
    },
    {
        question: "Can I request specific guards I've booked before?",
        answer:
            "Yes. Open a past booking and choose Book Again to request the same guard, subject to their availability.",
    },
    {
        question: "How do I use the SOS feature?",
        answer:
            "Press and hold the SOS button during an active booking. Your location and booking details are sent straight to our response team.",
    },
    {
        question: "How can I confirm that a job is completed?",
        answer:
            "Once the guard marks the job as finished you'll get a prompt to confirm completion and leave a rating.",
    },
];

/* ─── Support tickets ──────────────────────────────────────── */

export type TicketStatus = "in-progress" | "open" | "resolved";

export const TICKET_STATUS_BADGE: Record<TicketStatus, { label: string; className: string }> = {
    "in-progress": { label: "In Progress", className: "bg-[#e8943f]" },
    open: { label: "Open", className: "bg-[#3dabe2]" },
    resolved: { label: "Resolved", className: "bg-[#23c56c]" },
};

export interface TicketMessage {
    id: string;
    body: string;
    /** `user` bubbles sit right and green; `support` bubbles sit left and white. */
    author: "user" | "support";
    timeLabel?: string;
}

export interface SupportTicket {
    id: string;
    status: TicketStatus;
    subject: string;
    preview: string;
    timeLabel: string;
    messages: TicketMessage[];
}

const TICKETS: SupportTicket[] = [
    {
        id: "01111",
        status: "in-progress",
        subject: "I was charged twice for Pro Subscription",
        preview: "We're looking into this and will get back to you shor.......",
        timeLabel: "2h ago",
        messages: [
            {
                id: "m1",
                author: "user",
                body: "Hi, I noticed I was charged R133.16 twice on 10 March for my Pro subscription. Can you please check and refund the duplicate charge?",
            },
            { id: "m2", author: "user", body: "How Are You?" },
            {
                id: "m3",
                author: "support",
                body: "Hi there! Thanks for reaching out. We can see the duplicate charge on your account. We've escalated this to our billing team and it should be resolved within 24-48 hours.",
                timeLabel: "2 min ago",
            },
        ],
    },
    {
        id: "01112",
        status: "open",
        subject: "I was charged twice for Pro Subscription",
        preview: "We're looking into this and will get back to you shor.......",
        timeLabel: "2h ago",
        messages: [
            {
                id: "m1",
                author: "user",
                body: "Hi, I noticed I was charged R133.16 twice on 10 March for my Pro subscription. Can you please check and refund the duplicate charge?",
                timeLabel: "2h ago",
            },
        ],
    },
    {
        id: "01113",
        status: "resolved",
        subject: "I was charged twice for Pro Subscription",
        preview: "We're looking into this and will get back to you shor.......",
        timeLabel: "2h ago",
        messages: [
            {
                id: "m1",
                author: "user",
                body: "Hi, I noticed I was charged R133.16 twice on 10 March for my Pro subscription. Can you please check and refund the duplicate charge?",
            },
            {
                id: "m2",
                author: "support",
                body: "The duplicate charge has been refunded. It should reflect in your account within 3-5 working days.",
                timeLabel: "1h ago",
            },
        ],
    },
];

export function getSupportTickets(): SupportTicket[] {
    return TICKETS;
}

export function getSupportTicketById(id: string): SupportTicket | undefined {
    return TICKETS.find((ticket) => ticket.id === id);
}

/* ─── Feedback ─────────────────────────────────────────────── */

export interface FeedbackOption {
    value: string;
    emoji: string;
    label: string;
}

export const FEEDBACK_OPTIONS: FeedbackOption[] = [
    { value: "love-it", emoji: "🤩", label: "Love it" },
    { value: "neutral", emoji: "😐", label: "Neutral" },
    { value: "good", emoji: "😊", label: "Good" },
    { value: "needs-work", emoji: "😕", label: "Needs Work" },
];

/* ─── System & Legal ───────────────────────────────────────── */

export interface LinkRow {
    label: string;
    href: string;
}

export const LEGAL_DOCUMENTS: LinkRow[] = [
    { label: "Terms of Service", href: "/settings/system-legal" },
    { label: "Privacy Policy", href: "/settings/system-legal" },
    { label: "Community Guidelines", href: "/settings/system-legal" },
];
