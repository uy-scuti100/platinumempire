import { TrolleyIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
interface CategoryReference {
	_type: string;
	_ref: string;
}
const validateCategoryField = (
	value: any,
	context: any,
	categoryRef: string,
	categoryName: string
) => {
	const categories = context.document?.categories as
		| CategoryReference[]
		| undefined;
	const isVisible = categories?.some(
		(category) => category._ref === categoryRef
	);
	if (isVisible && (!value || value.length === 0)) {
		return `This field is required when ${categoryName} category is selected`;
	}
	return true;
};
export const productSchema = defineType({
	name: "products",
	title: "Products",
	type: "document",
	icon: () => "🛍️",
	fields: [
		defineField({
			name: "name",
			title: "Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "name",
			},
		}),
		defineField({
			name: "gender",
			title: "Gender",
			type: "string",
			options: {
				list: ["men", "women", "unisex"],
			},
		}),
		defineField({
			name: "categories",
			title: "Categories",
			type: "array",
			of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "clotheTypes",
			title: "Clothe Types",
			type: "array",
			of: [{ type: "reference", to: [{ type: "clotheType" }] }],
			hidden: ({ document }) => {
				const categories = document?.categories as
					| CategoryReference[]
					| undefined;
				return !categories?.some(
					(category) => category._ref === "e610193e-a837-4db8-b4ec-de5c56bc00e5"
				);
			},
			validation: (Rule) =>
				Rule.custom((value, context) => {
					return validateCategoryField(
						value,
						context,
						"e610193e-a837-4db8-b4ec-de5c56bc00e5",
						"wears"
					);
				}),
		}),
		defineField({
			name: "clotheSizes",
			title: "Clothe Sizes",
			type: "array",
			of: [{ type: "reference", to: [{ type: "clotheSize" }] }],
			hidden: ({ document }) => {
				const categories = document?.categories as
					| CategoryReference[]
					| undefined;
				return !categories?.some(
					(category) => category._ref === "e610193e-a837-4db8-b4ec-de5c56bc00e5"
				);
			},
			validation: (Rule) =>
				Rule.custom((value, context) => {
					return validateCategoryField(
						value,
						context,
						"e610193e-a837-4db8-b4ec-de5c56bc00e5",
						"wears"
					);
				}),
		}),
		defineField({
			name: "shoeSizes",
			title: "Shoe Sizes",
			type: "array",
			of: [{ type: "number" }], // Use numbers directly instead of a reference
			options: {
				list: Array.from({ length: 48 - 37 + 1 }, (_, i) => 37 + i), // Generate the list 37-48
			},
			hidden: ({ document }) => {
				const categories = document?.categories as
					| CategoryReference[]
					| undefined;
				return !categories?.some(
					(category) => category._ref === "e4728c52-0c2c-4a0f-b9c8-41621c9c4ef6"
				);
			},
			validation: (Rule) =>
				Rule.custom((values) => {
					if (!values || values.length === 0) {
						return "At least one shoe size must be selected.";
					}
					if (
						values.some(
							(size) => typeof size !== "number" || size < 37 || size > 48
						)
					) {
						return "Shoe sizes must be between 37 and 48.";
					}
					return true;
				}),
		}),

		defineField({
			name: "bagSizes",
			title: "Bag Sizes",
			type: "array",
			of: [{ type: "reference", to: [{ type: "bagSize" }] }],
			hidden: ({ document }) => {
				const categories = document?.categories as
					| CategoryReference[]
					| undefined;
				return !categories?.some(
					(category) => category._ref === "52735ff6-12d7-4945-bbad-8ec7e42d9aa2"
				);
			},
			validation: (Rule) =>
				Rule.custom((value, context) => {
					return validateCategoryField(
						value,
						context,
						"52735ff6-12d7-4945-bbad-8ec7e42d9aa2",
						"bags"
					);
				}),
		}),
		defineField({
			name: "accessorySizes",
			title: "Accessory Sizes",
			type: "array",
			of: [{ type: "reference", to: [{ type: "accessorySize" }] }],
			hidden: ({ document }) => {
				const categories = document?.categories as
					| CategoryReference[]
					| undefined;
				return !categories?.some(
					(category) => category._ref === "1f6933f6-c1df-4815-9ae9-6305c9cca260"
				);
			},
			validation: (Rule) =>
				Rule.custom((value, context) => {
					return validateCategoryField(
						value,
						context,
						"1f6933f6-c1df-4815-9ae9-6305c9cca260",
						"accessories"
					);
				}),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "images",
			title: "Images",
			type: "array",
			of: [
				{
					type: "image",
					options: { hotspot: true, metadata: ["blurhash", "lqip"] },
				},
			],
			options: {
				layout: "grid",
			},

			validation: (Rule) =>
				Rule.required().min(1).error("At least one image is required."),
		}),
		defineField({
			name: "color",
			title: "Color",
			type: "array",
			of: [{ type: "string" }],
		}),
		defineField({
			name: "price",
			title: "Price",
			type: "number",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "onSale",
			title: "On Sale",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "discountedPrice",
			title: "Discounted Price",
			type: "number",
			hidden: ({ document }) => !document?.onSale,
			validation: (Rule) =>
				Rule.custom((discountedPrice, context) => {
					if (context.document?.onSale && !discountedPrice) {
						return "Discounted price is required when item is on sale";
					}
					return true;
				}),
		}),
		defineField({
			name: "inStock",
			title: "In Stock",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "isNew",
			title: "Is New",
			type: "boolean",
			initialValue: false,
		}),
	],
	preview: {
		select: {
			name: "name",
			gender: "gender",
			images: "images",
			price: "price",
			color: "color",
		},
		prepare(selection) {
			const { name, gender, images, price, color } = selection;
			const image = images?.[0]; // Safely access the first image
			return {
				title: name,
				subtitle: `${gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : "Unisex"} - ${color} - ₦${price}`,
				media: image || TrolleyIcon,
			};
		},
	},
});
