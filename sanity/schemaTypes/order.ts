import { defineField, defineType } from "sanity";
export const orderSchema = defineType({
	name: "order",
	title: "Orders",
	icon: () => "🛒",
	type: "document",
	fields: [
		defineField({
			name: "customerName",
			title: "Customer Name",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "email",
			title: "Email Address",
			type: "string",
			validation: (Rule) => Rule.required().email(),
		}),

		defineField({
			name: "phone",
			title: "Phone Number",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "deliveryMethod",
			title: "Delivery Method",
			type: "string",
			options: {
				list: [
					{ title: "Shipping", value: "shipping" },
					{ title: "Store Pickup", value: "pickup" },
				],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "address",
			title: "Home Address",
			type: "string",
			validation: (Rule) =>
				Rule.custom((address, context) => {
					if (context.document?.deliveryMethod === "shipping" && !address) {
						return "Address is required for shipping orders";
					}
					return true;
				}),
		}),
		defineField({
			name: "apartment",
			title: "Apartment",
			type: "string",
		}),
		defineField({
			name: "city",
			title: "City",
			type: "string",
			validation: (Rule) =>
				Rule.custom((city, context) => {
					if (context.document?.deliveryMethod === "shipping" && !city) {
						return "City is required for shipping orders";
					}
					return true;
				}),
		}),
		defineField({
			name: "country",
			title: "Country",
			type: "string",
			validation: (Rule) =>
				Rule.custom((country, context) => {
					if (context.document?.deliveryMethod === "shipping" && !country) {
						return "Country is required for shipping orders";
					}
					return true;
				}),
		}),
		defineField({
			name: "state",
			title: "State",
			type: "string",
			validation: (Rule) =>
				Rule.custom((state, context) => {
					if (context.document?.deliveryMethod === "shipping" && !state) {
						return "State is required for shipping orders";
					}
					return true;
				}),
		}),
		defineField({
			name: "postalCode",
			title: "Postal Code",
			type: "string",
		}),
		defineField({
			name: "orderNote",
			title: "Order Note",
			type: "string",
		}),
		defineField({
			name: "totalAmount",
			title: "Total Amount",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),
		defineField({
			name: "paymentStatus",
			title: "Payment Status",
			type: "string",
			options: {
				list: [
					{ title: "Pending", value: "pending" },
					{ title: "Completed", value: "completed" },
					{ title: "Failed", value: "failed" },
				],
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "products",
			title: "Products",
			type: "array",
			of: [
				{
					type: "object",
					fields: [
						{
							name: "product",
							title: "Product",
							type: "reference",
							to: [{ type: "products" }], // Direct reference to product document
							validation: (Rule) => Rule.required(),
						},
						{
							name: "quantity",
							title: "Quantity",
							type: "number",
							validation: (Rule) => Rule.required().min(1),
						},
						{
							name: "price",
							title: "Price at Time of Purchase",
							type: "number",
							validation: (Rule) => Rule.required().min(0),
						},
					],
				},
			],
		}),

		defineField({
			name: "paymentReference",
			title: "Payment Reference",
			type: "string",
		}),
		defineField({
			name: "shippingFee",
			title: "Shipping Fee",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
		}),
		defineField({
			name: "orderNumber",
			title: "Order Number",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),

		defineField({
			name: "createdAt",
			title: "Created At",
			type: "datetime",
			initialValue: () => new Date().toISOString(),
			readOnly: true,
		}),
	],
});
