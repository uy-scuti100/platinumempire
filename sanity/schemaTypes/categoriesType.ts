import { defineField, defineType } from "sanity";

export const categorySchema = defineType({
	name: "category",
	title: "Categories",
	type: "document",
	icon: () => "🗃️",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "image",
			title: "Category Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
	],
	preview: {
		select: {
			title: "name",
			media: "image",
		},
	},
});
