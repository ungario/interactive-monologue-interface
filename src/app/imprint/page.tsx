import Monologue from "../../feat/Monologue";
import { generateMonologueMetadata } from "../../lib/meta";

export const generateMetadata = () => generateMonologueMetadata();

export default function Imprint() {
    return (
        <Monologue
            locale="en"
            initialChatBubbleId="imprint"
            showIntroduction={false}
        />
    );
}
