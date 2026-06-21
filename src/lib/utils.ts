import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitize a string for safe use in plain-text contexts (e.g. WhatsApp messages).
 * Strips control characters and trims whitespace. Does NOT HTML-escape — use
 * only for text that will not be set as innerHTML.
 */
export function sanitizeText(input: string, maxLength = 500): string {
  return input
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // strip control chars
    .trim()
    .slice(0, maxLength);
}

/**
 * Safely serialize data for use in a JSON-LD <script> tag.
 *
 * Escapes the HTML-unsafe sequences that can break out of a <script> block
 * even when the content-type is application/ld+json:
 *   </ → <\/    (closes script tags)
 *   <!-- → <\!-- (opens HTML comments)
 *   --> is safe after the above
 *
 * This is necessary because dangerouslySetInnerHTML bypasses React's XSS
 * protection, so we must sanitize manually before serializing.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

/**
 * Minimal inline markdown for blog body copy: **bold** and [text](url) links.
 * Escapes the source text first so any literal < or & in the prose can't
 * break the HTML, then applies the two supported patterns. Output is meant
 * for dangerouslySetInnerHTML on content the team authors directly in code,
 * not on user-submitted input.
 */
export function parseInlineMarkdown(text: string): string {
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}
