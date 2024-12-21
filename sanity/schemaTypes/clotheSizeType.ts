import { defineField, defineType } from "sanity";

export const clotheSizeSchema = defineType({
	name: "clotheSize",
	title: "Clothe Sizes",
	type: "document",
	icon: () => "📐",
	fields: [
		defineField({
			name: "name",
			title: "Size Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "abbreviation",
			title: "Size Abbreviation",
			type: "string",
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "abbreviation",
		},
	},
});
