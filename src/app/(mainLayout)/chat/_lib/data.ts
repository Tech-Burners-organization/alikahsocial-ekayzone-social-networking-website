export type PresenceStatus = "online" | "offline" | "busy";
export type MessageStatus = "sent" | "delivered" | "read";

export interface Conversation {
    id: string;
    name: string;
    handle: string;
    avatarUrl: string;
    presence: PresenceStatus;
    lastMessagePreview: string;
    lastMessageTime: string;
    unreadCount?: number;
}

interface TextMessage {
    id: string;
    kind: "text";
    sender: "me" | "them";
    time: string;
    status?: MessageStatus;
    text: string;
}

interface FileMessage {
    id: string;
    kind: "file";
    sender: "me" | "them";
    time: string;
    status?: MessageStatus;
    fileName: string;
    fileSize: string;
    fileExtension: string;
}

interface AudioMessage {
    id: string;
    kind: "audio";
    sender: "me" | "them";
    time: string;
    status?: MessageStatus;
    duration: string;
    playedDuration: string;
}

interface VideoMessage {
    id: string;
    kind: "video";
    sender: "me" | "them";
    time: string;
    status?: MessageStatus;
    thumbnailUrl: string;
}

export type ChatMessage = TextMessage | FileMessage | AudioMessage | VideoMessage;

export interface MessageGroup {
    date: string;
    messages: ChatMessage[];
}

const CONVERSATIONS: Conversation[] = [
    {
        id: "x-ae-a-13b",
        name: "X-AE-A-13b",
        handle: "@x_ae_a13b",
        avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop",
        presence: "online",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "jerome-white",
        name: "Jerome White",
        handle: "@jerome.white",
        avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=120&h=120&fit=crop",
        presence: "online",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "madagascar-silver",
        name: "Madagascar Silver",
        handle: "@madagascar.s",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop",
        presence: "offline",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
        unreadCount: 999,
    },
    {
        id: "pippins-mcgray",
        name: "Pippins McGray",
        handle: "@pippins.mg",
        avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop",
        presence: "online",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "mckinsey-vermillion",
        name: "McKinsey Vermillion",
        handle: "@azusanakano_1997",
        avatarUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=120&h=120&fit=crop",
        presence: "online",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
        unreadCount: 8,
    },
    {
        id: "dorian-f-gray",
        name: "Dorian F. Gray",
        handle: "@dorian.gray",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop",
        presence: "busy",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
        unreadCount: 2,
    },
    {
        id: "benedict-combersmacks",
        name: "Benedict Combersmacks",
        handle: "@benedict.c",
        avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop",
        presence: "busy",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "kaori-d-miyazono",
        name: "Kaori D. Miyazono",
        handle: "@kaori.dm",
        avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop",
        presence: "offline",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "saylor-twift",
        name: "Saylor Twift",
        handle: "@saylor.twift",
        avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&h=120&fit=crop",
        presence: "online",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "miranda-blue",
        name: "Miranda Blue",
        handle: "@miranda.blue",
        avatarUrl: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=120&h=120&fit=crop",
        presence: "offline",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "esmeralda-gray",
        name: "Esmeralda Gray",
        handle: "@esmeralda.gray",
        avatarUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop",
        presence: "offline",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
    },
    {
        id: "oarack-babama",
        name: "Oarack Babama",
        handle: "@oarack.b",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop",
        presence: "online",
        lastMessagePreview: "Enter your message description here...",
        lastMessageTime: "12:25",
        unreadCount: 7,
    },
];

// TODO: replace with a real conversation-history endpoint once the chat API exists.
// Every conversation currently shares this demo thread, contextualized to whichever
// contact is selected via the header — see ConversationPanel.
const DEMO_MESSAGE_GROUPS: MessageGroup[] = [
    {
        date: "19 August",
        messages: [
            {
                id: "m1",
                kind: "text",
                sender: "them",
                time: "10:25",
                text: "Hello my dear sir, I'm here do deliver the design requirement document for our next projects.",
            },
            {
                id: "m2",
                kind: "file",
                sender: "them",
                time: "10:26",
                fileName: "Design_project_2025.docx",
                fileSize: "2.5gb",
                fileExtension: "docx",
            },
            {
                id: "m3",
                kind: "text",
                sender: "me",
                time: "11:25",
                status: "sent",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco labori",
            },
        ],
    },
    {
        date: "Today",
        messages: [
            {
                id: "m4",
                kind: "text",
                sender: "them",
                time: "12:25",
                text: "Do androids truly dream of electric sheeps?",
            },
            {
                id: "m5",
                kind: "audio",
                sender: "me",
                time: "02:12",
                status: "sent",
                duration: "02:12",
                playedDuration: "01:25",
            },
            {
                id: "m6",
                kind: "video",
                sender: "them",
                time: "02:25",
                thumbnailUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
            },
        ],
    },
];

export function getConversations(): Conversation[] {
    return CONVERSATIONS;
}

export function getFilteredConversations(search: string): Conversation[] {
    const query = search.trim().toLowerCase();
    if (!query) return CONVERSATIONS;

    return CONVERSATIONS.filter(
        (conversation) =>
            conversation.name.toLowerCase().includes(query) ||
            conversation.handle.toLowerCase().includes(query)
    );
}

export function getConversationById(id: string): Conversation | undefined {
    return CONVERSATIONS.find((conversation) => conversation.id === id);
}

export function getMessageGroups(): MessageGroup[] {
    return DEMO_MESSAGE_GROUPS;
}
