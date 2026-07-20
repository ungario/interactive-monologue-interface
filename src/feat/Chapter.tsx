'use client';

import { useCallback, useEffect, useState } from 'react';
import ChatBubble from './ChatBubble';

type ChapterProps = {
    actionButtons: React.ReactNode[];
    setRef: (element: HTMLDivElement | null) => void;
    streamEnabled: boolean;
    texts: string[];
};

export default function Chapter({
    actionButtons,
    setRef,
    streamEnabled,
    texts,
}: ChapterProps) {
    const [visibleBubbleCount, setVisibleBubbleCount] = useState(
        streamEnabled ? 1 : texts.length
    );
    const showNextBubble = useCallback(() => {
        setVisibleBubbleCount((currentCount) =>
            Math.min(currentCount + 1, texts.length)
        );
    }, [texts.length]);

    useEffect(() => {
        if (!streamEnabled) {
            setVisibleBubbleCount(texts.length);
        }
    }, [streamEnabled, texts.length]);

    return texts.slice(0, visibleBubbleCount).map((text, textIndex) => {
        const isFinalBubble = textIndex === texts.length - 1;
        const isActiveBubble = textIndex === visibleBubbleCount - 1;

        return (
            <ChatBubble
                key={`${textIndex}-${text}`}
                ref={setRef}
                text={text}
                streamEnabled={streamEnabled && isActiveBubble}
                onStreamComplete={
                    !isFinalBubble && isActiveBubble
                        ? showNextBubble
                        : undefined
                }
                actionButtons={isFinalBubble ? actionButtons : []}
            />
        );
    });
}
