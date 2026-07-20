type ChatSrOnlyProps = {
    chatBubbles: Array<ChatBubble>;
};

export default function ChatSrOnly(props: ChatSrOnlyProps) {
    const chatBubbles = props.chatBubbles;
    return (
        <div className="chat-sr-only" aria-hidden="true">
            {props.chatBubbles.map((chatBubble) => (
                <div key={chatBubble.id}>
                    <h1>{chatBubble.id}</h1>
                    {chatBubble.text ? <p>{chatBubble.text}</p> : null}
                    {chatBubble.markdown ? <p>{chatBubble.markdown}</p> : null}
                </div>
            ))}
        </div>
    );
}
