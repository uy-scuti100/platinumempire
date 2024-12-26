"use client";

import { IProduct } from "@/actions/products";
import { useSearchParams } from "next/navigation";

export default function ThankYouPage() {
	const searchParams = useSearchParams();
	const rawData = searchParams.get("data");

	let invoiceData;
	try {
		// Parse the serialized data
		invoiceData = rawData ? JSON.parse(rawData) : null;
	} catch (error) {
		console.error("Failed to parse invoice data:", error);
	}

	if (!invoiceData) {
		return <p>Error: Unable to retrieve invoice details.</p>;
	}

	return (
		<div>
			<h1>Thank You for Your Purchase!</h1>
			<p>Order Number: {invoiceData.orderNumber}</p>
			<p>Customer Name: {invoiceData.customerInfo.name}</p>
			<p>Delivery Method: {invoiceData.deliveryMethod}</p>
			<p>Payment Reference: {invoiceData.paymentReference}</p>

			<h2>Order Details:</h2>
			<ul>
				{invoiceData.products.map(
					(
						product: IProduct & { quantity: number; lineTotal: number },
						index: number
					) => (
						<li key={index}>
							{product.name} - {product.quantity} x ${product.price.toFixed(2)}{" "}
							= ${product.lineTotal.toFixed(2)}
						</li>
					)
				)}
			</ul>

			<h3>Summary:</h3>
			<p>Subtotal: ${invoiceData.subtotal.toFixed(2)}</p>
			<p>Shipping Fee: ${invoiceData.shippingFee.toFixed(2)}</p>
			<p>VAT (7.5%): ${invoiceData.VAT.toFixed(2)}</p>
			<p>Total: ${invoiceData.total.toFixed(2)}</p>
		</div>
	);
}
