import { defineField, defineType } from "sanity";

export const clotheTypeSchema = defineType({
	name: "clotheType",
	title: "Clothe Types",
	type: "document",
	icon: () => "👕",
	fields: [
		defineField({
			name: "name",
			title: "Type Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
	],
	preview: {
		select: {
			title: "name",
		},
	},
});
