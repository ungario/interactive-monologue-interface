import Monologue from "../../feat/Monologue";
import { generateMonologueMetadata } from "../../lib/meta";

export const generateMetadata = () =>
    generateMonologueMetadata({ params: Promise.resolve({ locale: "at" }) });

export default function Page() {
    return (
        <Monologue
            locale="at"
            initialChatBubbleId="intro"
            showIntroduction
        />
    );
}
