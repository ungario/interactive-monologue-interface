import { readFile } from "fs/promises";
import path from "path";

const DATA_ROOT = path.join(process.cwd(), "data");
const DEFAULT_LOCALE: MonologueLocale = "en";

async function readBubbleJson(locale: MonologueLocale) {
    const preferredPath = path.join(DATA_ROOT, locale, "bubbles.json");

    try {
        return JSON.parse(await readFile(preferredPath, "utf8"));
    } catch (error) {
        if (locale === DEFAULT_LOCALE) {
            throw error;
        }

        const fallbackPath = path.join(DATA_ROOT, DEFAULT_LOCALE, "bubbles.json");
        return JSON.parse(await readFile(fallbackPath, "utf8"));
    }
}

async function resolveMarkdown(
    chatBubble: ChatBubble,
    locale: MonologueLocale,
) {
    if (chatBubble.type !== "md" || !chatBubble.file) {
        return chatBubble;
    }

    const localeRoot = path.resolve(DATA_ROOT, locale);
    const markdownPath = path.resolve(localeRoot, chatBubble.file);
    const relativePath = path.relative(localeRoot, markdownPath);

    if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
        throw new Error(`Markdown file must be inside ${localeRoot}`);
    }

    return {
        ...chatBubble,
        markdown: await readFile(markdownPath, "utf8"),
    };
}

export async function getChatBubbleMap(locale: MonologueLocale) {
    try {
        const json = await readBubbleJson(locale);
        if (!Array.isArray(json)) {
            throw new TypeError("Bubbles JSON must contain an array");
        }

        const chatBubbleEntries = await Promise.all(
            [...(json as ChatBubble[])]
                .sort((first, second) => first.order - second.order)
                .map(async (chatBubble) => [
                    chatBubble.id,
                    await resolveMarkdown(chatBubble, locale),
                ] as const),
        );

        return new Map<string, ChatBubble>(chatBubbleEntries);
    } catch (e) {
        throw new Error("Failed to load bubbles JSON", {
            cause: e as Error,
        });
    }
}
