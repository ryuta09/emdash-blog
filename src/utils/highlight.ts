/**
 * Syntax highlighting for Portable Text code blocks.
 *
 * Uses highlight.js -- the same engine as the admin editor (lowlight) --
 * so the published page matches what authors see while editing. Only the
 * core plus the languages below are bundled, to keep the Worker small.
 */
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import diff from "highlight.js/lib/languages/diff";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import markdown from "highlight.js/lib/languages/markdown";
import plaintext from "highlight.js/lib/languages/plaintext";
import python from "highlight.js/lib/languages/python";
import scss from "highlight.js/lib/languages/scss";
import shell from "highlight.js/lib/languages/shell";
import sql from "highlight.js/lib/languages/sql";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("bash", bash);
hljs.registerLanguage("css", css);
hljs.registerLanguage("diff", diff);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("markdown", markdown);
hljs.registerLanguage("plaintext", plaintext);
hljs.registerLanguage("python", python);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);
hljs.registerLanguage("yaml", yaml);

// Same shape the editor allows for the `language-{id}` class
const LANGUAGE_PATTERN = /^[a-z0-9][a-z0-9+#._-]*$/;

function escapeHtml(value: string): string {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

/**
 * Returns highlighted HTML for `code`, plus a class-safe language id.
 * Unknown languages fall back to escaped plain text.
 */
export function highlightCode(
	code: string,
	language?: string,
): { html: string; language?: string } {
	const id = language?.trim().toLowerCase();
	const safeId = id && LANGUAGE_PATTERN.test(id) ? id : undefined;

	if (safeId && hljs.getLanguage(safeId)) {
		const { value } = hljs.highlight(code, { language: safeId, ignoreIllegals: true });
		return { html: value, language: safeId };
	}
	return { html: escapeHtml(code), language: safeId };
}
