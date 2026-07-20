import Monologue from "../../../feat/Monologue";
import { generateMonologueMetadata } from "../../../lib/meta";

export const generateMetadata = () =>
    generateMonologueMetadata({ params: Promise.resolve({ locale: "at" }) });

export default function Meet() {
    return (
        <Monologue
            locale="at"
            initialChatBubbleId="meet"
            showIntroduction={false}
        />
    );
}
