import Monologue from "../../feat/Monologue";
import { generateMonologueMetadata } from "../../lib/meta";

export const generateMetadata = () => generateMonologueMetadata();

export default function Work() {
    return (
        <Monologue
            locale="en"
            initialChatBubbleId="work"
            showIntroduction={false}
        />
    );
}
