"use client";
import { useMemo, useReducer } from "react";
import { ChatContext } from "./chatContext";
import { chatReducerFactory } from "./chatReducer";

type ChatProviderProps = {
  children: React.ReactNode;
  chatBubbleEntries: Array<[string, ChatBubble]>;
  initialChatBubbleIds: string[];
}

export default function ChatProvider(props: ChatProviderProps) {
  const children = props.children;
  const chatBubbleMap = useMemo(
    () => new Map<string, ChatBubble>(props.chatBubbleEntries),
    [props.chatBubbleEntries],
  );
  const chatReducer = useMemo(
    () => chatReducerFactory(chatBubbleMap),
    [chatBubbleMap],
  );
  const [state, dispatch] = useReducer(
    chatReducer,
    undefined,
    () => ({
      chatBubbles: props.initialChatBubbleIds
        .map((id) => chatBubbleMap.get(id))
        .filter((chatBubble): chatBubble is ChatBubble => Boolean(chatBubble)),
    }),
  );
  const chatStore: ChatStore = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state, dispatch],
  );
  return <ChatContext.Provider
    value={chatStore}
  >{children}</ChatContext.Provider>
}
