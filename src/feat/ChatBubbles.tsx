'use client';
import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import ChatBubble from '../comp/ChatBubble';
import useScrollDisabler from '../hooks/useScrollDisabler';
import ActionButton from '../comp/ActionButton';
import { ChatContext } from '../state/chatContext';
import Project from './Project';

export default function ChatBubbles() {
    const { state, dispatch } = useContext(ChatContext);
    const { isScrollDisabled } = useScrollDisabler(
        !(state.chatBubbles.length > 1)
    );
    const isNewChatBubble = useRef(true);
    const bubbleDomRefs = useRef<(HTMLDivElement | null)[]>([]);
    useEffect(() => {
        if (isScrollDisabled) return;

        const handleScroll = () => {};

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isScrollDisabled]);

    const [currentIndex, setCurrentIndex] = useState(0);

    function scrollToChatBubble(ix: number) {
        const bubble = bubbleDomRefs.current[ix];
        if (bubble) {
            const viewportHeight = window.innerHeight;
            const bubbleTop =
                bubble.getBoundingClientRect().top + window.scrollY;
            const pfpHeight = window.innerWidth < 600 ? 48 : 80;
            const scrollPosition =
                bubbleTop - viewportHeight / 2 + pfpHeight / 2;
            window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
            if (ix !== currentIndex) {
                // triggerHaptic()
            }
            setCurrentIndex(ix);
        }
    }

    useEffect(() => {
        if (state.chatBubbles.length > 0) {
            const timeout = setTimeout(() => {
                scrollToChatBubble(state.chatBubbles.length - 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [state.chatBubbles.length]);

    return (
        <div style={{ width: '100%' }}>
            <div className="chat-bubbles-spacer-block" />
            <div
                {...{
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    },
                }}
            >
                {state.chatBubbles.map((chatBubble, ix) => {
                    const chatBubbleText = chatBubble.text;
                    const projectItems =
                        chatBubble.id === 'work' ? chatBubble.items : [];
                    return (
                        <Fragment key={ix}>
                            {chatBubbleText ? (
                                <ChatBubble
                                    ref={(el) => {
                                        bubbleDomRefs.current[ix] = el;
                                    }}
                                    text={chatBubbleText}
                                    streamEnabled={
                                        state.chatBubbles.length - 1 === ix &&
                                        isNewChatBubble.current
                                    }
                                    actionButtons={[
                                        chatBubble.actions.map((action) => {
                                            return (
                                                <ActionButton
                                                    key={action.id}
                                                    action={action}
                                                    click={(
                                                        value: ActionButtonType,
                                                        ready: Promise<void>
                                                    ) => {
                                                        dispatch(action.event);
                                                        isNewChatBubble.current = true;
                                                    }}
                                                />
                                            );
                                        }),
                                    ]}
                                />
                            ) : null}
                            {!chatBubbleText && projectItems?.length ? (
                                <div
                                    ref={(el) => {
                                        bubbleDomRefs.current[ix] = el;
                                    }}
                                />
                            ) : null}
                            {projectItems?.map((item) => (
                                <Project
                                    key={`${item.title}-${item.date}`}
                                    item={item}
                                />
                            ))}
                        </Fragment>
                    );
                })}
            </div>
            <div className="chat-bubbles-spacer-block" />
        </div>
    );
}
