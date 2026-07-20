import Monologue from "../feat/Monologue";
import { generateMonologueMetadata } from "../lib/meta";

export const generateMetadata = () => generateMonologueMetadata();

export default function Page() {
    return (
        <Monologue
            locale="en"
            initialChatBubbleId="intro"
            showIntroduction
        />
    );
}
