import { readFile } from "fs/promises";
import path from "path";

const DATA_ROOT = path.join(process.cwd(), "data");
const DEFAULT_LOCALE: MonologueLocale = "en";

async function readActionJson(locale: MonologueLocale) {
    const preferredPath = path.join(DATA_ROOT, locale, "buttons.json");

    try {
        return JSON.parse(await readFile(preferredPath, "utf8"));
    } catch (error) {
        if (locale === DEFAULT_LOCALE) {
            throw error;
        }

        const fallbackPath = path.join(DATA_ROOT, DEFAULT_LOCALE, "buttons.json");
        return JSON.parse(await readFile(fallbackPath, "utf8"));
    }
}

export async function getActionButtonMap(locale: MonologueLocale) {
    try {
        const json = await readActionJson(locale);
        return new Map<string, ActionButton>(
            Object.entries(json).map(([key, value]) => [
                key,
                { ...(value as object), id: key } as ActionButton,
            ]),
        );
    } catch (e) {
        throw new Error("Failed to load actions JSON", {
            cause: e as Error,
        });
    }
}
