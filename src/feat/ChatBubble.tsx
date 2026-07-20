"use client";
import { useTextStream } from "../hooks/useTextStream";
import React, { forwardRef, useEffect } from "react";
type ChatBubbleProps = {
  text: string;
  actionButtons: React.ReactNode[];
  streamEnabled: boolean;
  onStreamComplete?: () => void;
};

const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>((props, ref) => {
  const { text, actionButtons, streamEnabled, onStreamComplete } = props;
  const { displayText, done } = useTextStream(text, streamEnabled);

  useEffect(() => {
    if (streamEnabled && done) {
      onStreamComplete?.();
    }
  }, [done, onStreamComplete, streamEnabled]);

  return (
    <div className="chat-bubble" ref={ref}>
      <div className="chat-bubble-pfpspacer"></div>
      <div
        style={{
          display: "flex",
          marginRight: "10px",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          className="chat-bubble-message"
        >
          {displayText}
        </div>
        {actionButtons.length > 0 && <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {actionButtons}
        </div>}
      </div>
    </div>
  );
});

export default ChatBubble;
