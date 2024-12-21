import { defineField, defineType } from "sanity";

export const accessorySizeSchema = defineType({
	name: "accessorySize",
	title: "Accessory Sizes",
	type: "document",
	icon: () => "⌚️",
	fields: [
		defineField({
			name: "name",
			title: "Size Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "name",
			image: "icon",
		},
	},
});
