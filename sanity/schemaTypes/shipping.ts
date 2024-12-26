import { defineField, defineType } from "sanity";

export const shippingSchema = defineType({
	name: "state",
	title: "State",
	type: "document",
	icon: () => "🚚",
	fields: [
		defineField({
			name: "name",
			title: "State Name",
			type: "string",
			validation: (Rule) => Rule.required().error("State name is required"),
		}),
		defineField({
			name: "zone",
			title: "Zone",
			type: "string",
			options: {
				list: [
					{ title: "North", value: "North" },
					{ title: "East", value: "East" },
					{ title: "West", value: "West" },
					{ title: "South", value: "South" },
				],
			},
			validation: (Rule) =>
				Rule.required().error(
					"Zone is required. Choose from North, East, West, or South"
				),
		}),
		defineField({
			name: "price",
			title: "Shipping Price",
			type: "number",
			validation: (Rule) =>
				Rule.required()
					.positive()
					.integer()
					.error("Shipping price must be a positive integer"),
		}),
	],
});
