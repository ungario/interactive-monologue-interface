import Monologue from "../../../feat/Monologue";
import { generateMonologueMetadata } from "../../../lib/meta";

export const generateMetadata = () =>
    generateMonologueMetadata({ params: Promise.resolve({ locale: "at" }) });

export default function Work() {
    return (
        <Monologue
            locale="at"
            initialChatBubbleId="work"
            showIntroduction={false}
        />
    );
}
