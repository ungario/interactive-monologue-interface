'use client';
import {
    Fragment,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import useScrollDisabler from '../hooks/useScrollDisabler';
import ActionButton from './ActionButton';
import { ChatContext } from '../state/chatContext';
import Project from './Project';
import Chapter from './Chapter';
import MarkdownProcessor from './MarkdownProcessor';

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
        <div style={{ width: '100%'}}>
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
                    const chatBubbleTexts = chatBubble.bubbles?.length
                        ? [...chatBubble.bubbles]
                              .sort((first, second) => first.order - second.order)
                              .map((bubble) => bubble.content)
                        : chatBubble.text
                          ? [chatBubble.text]
                          : [];
                    const projectItems =
                        chatBubble.id === 'work' ? chatBubble.items : [];
                    const actionButtons = chatBubble.actions.map((action) => (
                        <ActionButton
                            key={action.id}
                            action={action}
                            click={() => {
                                dispatch(action.event);
                                isNewChatBubble.current = true;
                            }}
                        />
                    ));
                    return (
                        <Fragment key={ix}>
                            {chatBubble.type === 'md' ? (
                                <MarkdownProcessor
                                    ref={(element) => {
                                        bubbleDomRefs.current[ix] = element;
                                    }}
                                    markdown={chatBubble.markdown ?? ''}
                                    actionButtons={actionButtons}
                                />
                            ) : chatBubbleTexts.length ? (
                                <Chapter
                                    texts={chatBubbleTexts}
                                    setRef={(element) => {
                                        bubbleDomRefs.current[ix] = element;
                                    }}
                                    streamEnabled={
                                        state.chatBubbles.length - 1 === ix &&
                                        isNewChatBubble.current
                                    }
                                    actionButtons={actionButtons}
                                />
                            ) : null}
                            {projectItems?.map((item, projectIndex) => (
                                <Project
                                    key={`${item.title}-${item.date}`}
                                    item={item}
                                    ref={
                                        !chatBubbleTexts.length &&
                                        projectIndex === 0
                                            ? (element) => {
                                                  bubbleDomRefs.current[ix] =
                                                      element;
                                              }
                                            : undefined
                                    }
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
