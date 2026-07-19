"use client";
import { useTextStream } from "../hooks/useTextStream";
import React, { forwardRef } from "react";
type ChatBubbleProps = {
  text: string;
  actionButtons: React.ReactNode[];
  streamEnabled: boolean;
};

const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>((props, ref) => {
  const { text, actionButtons, streamEnabled } = props;
  const { displayText, done } = useTextStream(text, streamEnabled);

  return (
    <div className="chat-bubble" ref={ref}>
      <div className="chat-bubble-pfpspacer"></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          className="chat-bubble-message"
        >
          {displayText}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {actionButtons}
        </div>
      </div>
    </div>
  );
});

export default ChatBubble;
