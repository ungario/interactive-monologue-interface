import Monologue from "../../feat/Monologue";
import { generateMonologueMetadata } from "../../lib/meta";

export const generateMetadata = () => generateMonologueMetadata();

export default function About() {
    return <Monologue locale="en" />;
}
