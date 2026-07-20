import ChatBubbles from './ChatBubbles';
import Pfp from './Pfp';
import ChatProvider from '../state/ChatProvider';
import ChatSrOnly from './ChatSrOnly';
import { getChatBubbleMap } from '../lib/read-bubbles';
import { getActionButtonMap } from '../lib/read-actions';

export default async function Monologue({
    locale,
    initialChatBubbleId,
    showIntroduction,
}: {
    locale: MonologueLocale;
    initialChatBubbleId: string;
    showIntroduction: boolean;
}) {
    const actionButtonMap = await getActionButtonMap(locale);
    const actionButtonKeys = [...actionButtonMap.keys()];

    const chatBubbleMap = await getChatBubbleMap(locale);
    const chatBubbleArray: ChatBubble[] = [];
    for (const chatBubble of chatBubbleMap.values()) {
        const newActions = chatBubble.actionIds.reduce<ActionButton[]>(
            (acc, actionId) => {
                const action = actionButtonMap.get(actionId);
                if (actionButtonKeys.includes(actionId) && action) {
                    acc.push(action);
                }
                return acc;
            },
            []
        );
        chatBubble.actions = newActions;
        chatBubble.actionIds = newActions.map((action) => action.id);
        chatBubbleArray.push(chatBubble);
    }
    const chatBubbleEntries: Array<[string, ChatBubble]> = chatBubbleArray.map(
        (chatBubble) => [chatBubble.id, chatBubble]
    );
    const initialChatBubbleIds = [
        ...(showIntroduction ? ['intro'] : []),
        initialChatBubbleId,
    ].filter((id, index, ids) => ids.indexOf(id) === index);

    return (
        <div>
            <ChatProvider
                chatBubbleEntries={chatBubbleEntries}
                initialChatBubbleIds={initialChatBubbleIds}
            >
                <ChatSrOnly chatBubbles={chatBubbleEntries.map((x) => x[1])} />
                <Pfp />
                <ChatBubbles />
            </ChatProvider>
        </div>
    );
}
