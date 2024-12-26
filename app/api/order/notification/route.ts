// app/api/order/notification/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";
// import OrderConfirmationEmail from "@/emails/order-confirmation";
import StoreNotificationEmail from "@/emails/store-notification";

const resend = new Resend(process.env.RESEND_API_KEY!);
const STORE_EMAIL = process.env.STORE_EMAIL_ADDRESS!;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { orderData } = body;

		// Send notification to store owner
		await resend.emails.send({
			from: "🛒 Order at Platinum Fashion Hub <onboarding@resend.dev>",
			to: STORE_EMAIL,
			subject: `New Order #${orderData.orderNumber}`,
			react: StoreNotificationEmail({
				order: {
					orderNumber: orderData.orderNumber,
					customerName: orderData.customerName,
					email: orderData.email,
					phone: orderData.phone,
					totalAmount: orderData.totalAmount,
					products: orderData.products,
					deliveryMethod: orderData.deliveryMethod,
					address: orderData.address,
					city: orderData.city,
					state: orderData.state,
					paymentReference: orderData.paymentReference,
				},
			}),
		});

		return NextResponse.json(
			{ message: "Store notification sent successfully" },
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error sending store notification:", error);
		return NextResponse.json(
			{ error: "Error sending store notification" },
			{ status: 500 }
		);
	}
}
