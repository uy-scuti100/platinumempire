import { definePlugin } from "sanity";

export const lowercasePlugin = definePlugin({
	name: "lowercase-plugin",
	document: {
		// Handles new documents
		// @ts-expect-error
		newDocument: async (params: any) => {
			const { document } = params;
			if (document.name) {
				return {
					...params,
					document: {
						...document,

						name: document.name.toLowerCase(),
					},
				};
			}
			return params;
		},
		// Handles document updates

		patch: async (params: { document: any }) => {
			const { document } = params;
			if (document.name) {
				return {
					...params,
					document: {
						...document,

						name: document.name.toLowerCase(),
					},
				};
			}

			return params;
		},
	},
});
