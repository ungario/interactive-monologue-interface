import Monologue from "../../../feat/Monologue";
import { generateMonologueMetadata } from "../../../lib/meta";

export const generateMetadata = () =>
    generateMonologueMetadata({ params: Promise.resolve({ locale: "at" }) });

export default function Contact() {
    return (
        <Monologue
            locale="at"
            initialChatBubbleId="contact"
            showIntroduction={false}
        />
    );
}
