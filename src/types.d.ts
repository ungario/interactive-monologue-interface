type Chat = {
    chatBubbles: ChatBubble[];
};

type ChatStore = {
    state: Chat;
    dispatch: React.Dispatch<ActionButtonEvent>;
};

type ChatBubble = {
    id: string;
    text?: string;
    bubbles?: ChatBubblePart[];
    items?: ProjectItem[];
    actions: ActionButton[];
    actionIds: string[];
};

type ChatBubblePart = {
    order: number;
    content: string;
};

type ProjectItem = {
    date: string;
    title: string;
    subtitle?: string;
    images?: string[];
};

type ActionButtonType = "chat" | "locale" | "link" | "download" | "mail";
type ActionButton = {
    id: string;
    label: string;
    event: ActionButtonEvent;
};
type ActionButtonEvent = {
    type: ActionButtonType;
    value: string;
};

type MonologueLocale = "en" | "at";

// "chat:contact": {
//   "id": "chat:contact",
//   "name": "Contact",
//   "type": "chat",
//   "value": "contact"
// },
