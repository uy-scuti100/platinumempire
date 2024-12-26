import { defineField, defineType } from "sanity";
export const countrySchema = defineType({
	name: "country",
	title: "Countries",
	type: "document",
	icon: () => "🌍",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "price",
			title: "Price",
			type: "number",
			hidden: ({ document }) =>
				document?.name?.toString().toLowerCase() === "nigeria",
			validation: (Rule) => Rule.required().positive(),
		}),
	],
});
