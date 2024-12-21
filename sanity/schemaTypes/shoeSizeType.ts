import { defineField, defineType } from "sanity";

export const shoeSizeSchema = defineType({
	name: "shoeSize",
	title: "Shoe Sizes",
	type: "document",
	icon: () => "🥾",
	fields: [
		defineField({
			name: "name",
			title: "Size",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "abbreviation",
			title: "Size Abbreviation",
			type: "array",
			of: [
				{
					type: "string",
				},
			],
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "region",
		},
	},
});
