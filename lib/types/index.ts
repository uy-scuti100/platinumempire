// types/stock-request.ts
import { z } from "zod";

export const StockRequestSchema = z.object({
	productId: z.string({
		required_error: "Product ID is required",
	}),
	phone: z
		.string({
			required_error: "Phone number is required",
		})
		.regex(/^\d{11}$/, {
			message: "Phone number must be exactly 11 digits",
		}),
	isWhatsApp: z.boolean().default(false),
	message: z.string().optional(),
});

export type StockRequest = z.infer<typeof StockRequestSchema>;

// This type represents the response from the server action
export type ActionResponse = {
	success: boolean;
	message: string;
	fieldErrors?: {
		[K in keyof StockRequest]?: string[];
	};
};
