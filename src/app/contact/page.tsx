import Monologue from "../../feat/Monologue";
import { generateMonologueMetadata } from "../../lib/meta";

export const generateMetadata = () => generateMonologueMetadata();

export default function Contact() {
    return (
        <Monologue
            locale="en"
            initialChatBubbleId="contact"
            showIntroduction={false}
        />
    );
}
