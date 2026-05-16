import ChatBubbles from './ChatBubbles';
import Pfp from './Pfp';
import ChatProvider from '../state/ChatProvider';
import ChatSrOnly from './ChatSrOnly';
import { getChatBubbleMap } from '../lib/read-bubbles';
import { getActionButtonMap } from '../lib/read-actions';

export default async function Monologue({
    locale,
}: {
    locale: MonologueLocale;
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

    return (
        <div>
            <ChatProvider chatBubbleEntries={chatBubbleEntries}>
                <ChatSrOnly chatBubbles={chatBubbleEntries.map((x) => x[1])} />
                <Pfp />
                <ChatBubbles />
            </ChatProvider>
        </div>
    );
}
