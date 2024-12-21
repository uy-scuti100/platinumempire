import { defineField, defineType } from "sanity";

export const bagSizeSchema = defineType({
	name: "bagSize",
	title: "Bag Sizes",
	type: "document",
	icon: () => "👜",
	fields: [
		defineField({
			name: "name",
			title: "Size Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "dimensions",
			title: "Dimensions",
			type: "string",
		}),
	],
	preview: {
		select: {
			title: "name",
			subtitle: "dimensions",
		},
	},
});
