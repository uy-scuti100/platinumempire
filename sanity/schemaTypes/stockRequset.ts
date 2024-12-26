import { defineField, defineType } from "sanity";

export const stockRequestSchema = defineType({
	name: "stockRequest",
	title: "Stock Request",
	icon: () => "📭",
	type: "document",
	fields: [
		defineField({
			name: "product",
			title: "Product",
			type: "reference",
			to: [{ type: "products" }], // Assuming a 'product' schema already exists
			description: "The product the customer wants to be notified about.",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "phone",
			title: "Phone Number",
			type: "string",
			description: "Customer phone number to notify them through.",
			validation: (Rule) =>
				Rule.required()
					.regex(/^\d{11}$/, {
						name: "phone number",
						invert: false,
					})
					.error("Phone number must be 11 digits."),
		}),
		defineField({
			name: "isWhatsApp",
			title: "Is WhatsApp Number",
			type: "boolean",
			description:
				"Indicates if the provided phone number is a WhatsApp number so you can just reach out to them straight on Whatsapp .",
			initialValue: false,
		}),

		defineField({
			name: "message",
			title: "Message",
			type: "text",
			description: "Custom message to include in the notification.",
		}),
		defineField({
			name: "status",
			title: "Notification Status",
			type: "string",
			description:
				"Nifemi 😜 😘.. Have you notified or got back to them to let them if its now available? Dont forget o ❤️.",
			options: {
				list: [
					{ title: "Pending", value: "pending" },
					{ title: "Notified", value: "notified" },
				],
				layout: "radio",
			},
			initialValue: "pending",
		}),
		defineField({
			name: "createdAt",
			title: "Created At",
			type: "datetime",
			description: "Timestamp when the request was created.",
			initialValue: () => new Date().toISOString(),
			readOnly: true,
		}),
	],
	preview: {
		select: {
			title: "product.name",
			subtitle: "phone",
			status: "status",
		},
		prepare(selection) {
			const { title, subtitle, status } = selection;
			return {
				title: title,
				subtitle: `Phone: ${subtitle} (${status})`,
			};
		},
	},
});
