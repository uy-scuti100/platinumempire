import { defineField, defineType } from "sanity";
export const orderSchema = defineType({
	name: "order",
	title: "Orders",
	icon: () => "🛒",
	type: "document",
	readOnly: true,
	fields: [
		defineField({
			name: "customerName",
			title: "Customer Name",
			type: "string",
			validation: (Rule) => Rule.required(),
			readOnly: true,
		}),
		defineField({
			name: "email",
			title: "Email Address",
			type: "string",
			validation: (Rule) => Rule.required().email(),
			readOnly: true,
		}),

		defineField({
			name: "phone",
			title: "Phone Number",
			type: "string",
			validation: (Rule) => Rule.required(),
			readOnly: true,
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
			readOnly: true,
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
			readOnly: true,
		}),
		defineField({
			name: "apartment",
			title: "Apartment",
			type: "string",
			readOnly: true,
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
			readOnly: true,
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
			readOnly: true,
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
			readOnly: true,
		}),
		defineField({
			name: "postalCode",
			title: "Postal Code",
			type: "string",
			readOnly: true,
		}),
		defineField({
			name: "orderNote",
			title: "Order Note",
			type: "string",
			readOnly: true,
		}),
		defineField({
			name: "totalAmount",
			title: "Total Amount",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
			readOnly: true,
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
			readOnly: true,
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
							to: [{ type: "products" }],
							validation: (Rule) => Rule.required(),
						},
						{
							name: "quantity",
							title: "Quantity",
							type: "number",
							validation: (Rule) => Rule.required().min(1),
							readOnly: true,
						},
						{
							name: "price",
							title: "Price at Time of Purchase",
							type: "number",
							validation: (Rule) => Rule.required().min(0),
							readOnly: true,
						},
						{
							name: "color",
							type: "string",
							validation: (Rule) => Rule.required(),
							readOnly: true,
						},
						{
							name: "size",
							type: "string",
							validation: (Rule) => Rule.required(),
							readOnly: true,
						},
					],
					readOnly: true,
				},
			],
			readOnly: true,
		}),

		defineField({
			name: "paymentReference",
			title: "Payment Reference",
			type: "string",
			readOnly: true,
		}),
		defineField({
			name: "shippingFee",
			title: "Shipping Fee",
			type: "number",
			validation: (Rule) => Rule.required().min(0),
			readOnly: true,
		}),
		defineField({
			name: "orderNumber",
			title: "Order Number",
			type: "string",
			validation: (Rule) => Rule.required(),
			readOnly: true,
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
