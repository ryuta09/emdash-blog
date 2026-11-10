import CodeBlock from "../components/CodeBlock.astro";

/** Block overrides passed to <PortableText components={...}> */
export const portableTextComponents = {
	type: {
		code: CodeBlock,
	},
};
