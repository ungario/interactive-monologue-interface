import Monologue from "../../feat/Monologue";
import { generateMonologueMetadata } from "../../lib/meta";

export const generateMetadata = () => generateMonologueMetadata();

export default function Meet() {
    return (
        <Monologue
            locale="en"
            initialChatBubbleId="meet"
            showIntroduction={false}
        />
    );
}
