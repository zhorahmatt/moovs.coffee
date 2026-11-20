import type { Lang } from "../i18n";
import { en, type Copy } from "./en";
import { id } from "./id";

const copy: Record<Lang, Copy> = { en, id };

export const getCopy = (lang: Lang): Copy => copy[lang];
export type { Copy };
