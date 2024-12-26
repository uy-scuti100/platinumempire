"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { downloadUrl, formatPriceInNaira } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { SpinnerIcon } from "@sanity/icons";
import { Download, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Header } from "../checkout/_components/header";

function OrderDetails() {
	const searchParams = useSearchParams();
	const [downloadPdf, setDownloadPdf] = useState(false);
	const orderData = searchParams.get("data")
		? JSON.parse(decodeURIComponent(searchParams.get("data") as string))
		: null;

	if (!orderData) return null;
	const handleDownload = async () => {
		try {
			setDownloadPdf(true);
			const response = await fetch("/api/pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orderData }),
			});

			if (!response.ok) {
				throw new Error("Failed to generate PDF");
			}

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);

			await downloadUrl(url, `order-${orderData.orderNumber}.pdf`, {
				downloadBlob: false,
			});

			URL.revokeObjectURL(url);
			setDownloadPdf(false);
		} catch (error) {
			console.error("Download error:", error);
			alert("Failed to download PDF. Please try again.");
		}
	};
	const handleShare = () => {
		if (navigator.share) {
			navigator.share({
				title: `Order Details - ${orderData.orderNumber}`,
				text: `Check out the order details for order #${orderData.orderNumber}`,
				url: window.location.href,
			});
		} else {
			alert("Sharing is not supported in this browser.");
		}
	};

	return (
		<Card className="mt-8">
			<CardContent className="p-6">
				<div className="space-y-6">
					{/* Order Information */}
					<div className="border-b pb-4">
						<h2 className="font-semibold mb-2">Order Information</h2>
						<p>Order Number: {orderData.orderNumber}</p>
						<p>Date: {new Date(orderData.issueDate).toLocaleDateString()}</p>
						<p>Payment Reference: {orderData.paymentReference}</p>
					</div>

					{/* Customer Information */}
					<div className="border-b pb-4">
						<h2 className="font-semibold mb-2">Customer Details</h2>
						<p>Name: {orderData.customerName}</p>
						<p>Email: {orderData.email}</p>
						<p>Phone: {orderData.phone}</p>
					</div>

					{/* Delivery Information */}
					<div className="border-b pb-4">
						<h2 className="font-semibold mb-2">Delivery Details</h2>
						<p>Method: {orderData.deliveryMethod}</p>
						{orderData.deliveryMethod === "shipping" && (
							<div className="mt-2">
								<p>{orderData.address}</p>
								{orderData.apartment && <p>{orderData.apartment}</p>}
								<p>{`${orderData.city}, ${orderData.state}`}</p>
								<p>{orderData.country}</p>
								{orderData.postalCode && (
									<p>Postal Code: {orderData.postalCode}</p>
								)}
							</div>
						)}
					</div>

					{/* Products */}
					<div className="border-b pb-4">
						<h2 className="font-semibold mb-2">Order Details:</h2>
						<div className="overflow-x-auto">
							<table className="min-w-full table-auto border-collapse">
								<thead className="bg-gray-100">
									<tr>
										<th className="text-left px-4 py-2 font-medium text-gray-700">
											Product
										</th>
										<th className="text-left px-4 py-2 font-medium text-gray-700">
											Color
										</th>
										<th className="text-left px-4 py-2 font-medium text-gray-700">
											Size
										</th>
										<th className="text-left px-4 py-2 font-medium text-gray-700">
											Quantity
										</th>
										<th className="text-left px-4 py-2 font-medium text-gray-700">
											Price
										</th>
									</tr>
								</thead>
								<tbody>
									{orderData.products.map(
										(
											product: {
												name: string;
												image?: string;
												color: string;
												size: string;
												quantity: number;
												price: number;
											},
											index: number
										) => (
											<tr
												key={index}
												className="border-b last:border-none hover:bg-gray-50"
											>
												{/* Product Name and Image */}
												<td className="px-4 py-3 flex items-center space-x-4">
													<div className="relative h-[50px] w-[50px] rounded-md overflow-hidden">
														{product.image && (
															<Image
																fill
																loading="eager"
																priority
																src={urlFor(product.image).url()}
																alt={product.name}
																className="object-cover"
																onError={(e) => {
																	const target = e.target as HTMLImageElement;
																	target.src = "/placeholder-image.png"; // Your fallback image
																}}
															/>
														)}
													</div>
													<span className="font-medium">{product.name}</span>
												</td>

												{/* Color */}
												<td className="px-4 py-3 text-sm text-gray-600">
													{product.color}
												</td>

												{/* Size */}
												<td className="px-4 py-3 text-sm text-gray-600">
													{product.size}
												</td>

												{/* Quantity */}
												<td className="px-4 py-3 text-sm text-gray-600">
													{product.quantity}
												</td>

												{/* Price */}
												<td className="px-4 py-3 font-medium">
													{formatPriceInNaira(product.price * product.quantity)}
												</td>
											</tr>
										)
									)}
								</tbody>
							</table>
						</div>
					</div>

					{/* Order Summary */}
					<div>
						<h2 className="font-semibold mb-2">Order Summary</h2>
						<div className="space-y-2">
							<div className="flex justify-between">
								<p>Subtotal</p>
								<p>
									{formatPriceInNaira(
										orderData.totalAmount - orderData.shippingFee
									)}
								</p>
							</div>
							<div className="flex justify-between">
								<p>Shipping Fee</p>
								<p>{formatPriceInNaira(orderData.shippingFee)}</p>
							</div>
							<div className="flex justify-between font-semibold">
								<p>Total</p>
								<p>{formatPriceInNaira(orderData.totalAmount)}</p>
							</div>
						</div>
					</div>

					{/* Download and Share Buttons */}
					<div className="flex flex-col items-center gap-4 text-sm text-gray-500">
						<p className="text-center">Thank you for shopping with us!</p>
						<div className="flex gap-2 print:hidden">
							<Button
								variant="outline"
								disabled={downloadPdf}
								onClick={handleDownload}
								className="flex items-center text-base disabled:opacity-50 disabled:cursor-not-allowed shop-now-btn btn hover:text-white btn hover:bg-[#4e50de] bg-[#4043E7] rounded-none  "
							>
								{downloadPdf ? (
									"Downloading..."
								) : (
									<>
										<Download className="h-4 w-4 mr-2" />{" "}
										<span> Download Receipt</span>
									</>
								)}
							</Button>
							<Button
								variant="outline"
								onClick={handleShare}
								disabled={downloadPdf}
								className="flex items-center disabled:opacity-50 disabled:cursor-not-allowed shop-now-btn btn bg-custom hover:bg-custom-hover rounded-none  hover:text-white text-base"
							>
								<Share2 className="h-4 w-4 mr-2" />
								Share
							</Button>
						</div>
						<div className="mt-8 text-center">
							<Link href="/">
								<Button className="shop-now-btn rounded-none  text-base">
									Continue Shopping 🛍️
								</Button>
							</Link>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

export default function ThankYouPage() {
	return (
		<Suspense fallback={<Loading />}>
			<div className="min-h-screen max-w-4xl mx-auto bg-white receipt">
				<Header />
				<main className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8">
						<h1 className="text-3xl font-semibold text-gray-900">
							Thank You for Your Order!
						</h1>
						<p className="mt-2 text-lg text-gray-600">
							We appreciate your business and hope you enjoy your new items.
						</p>
					</div>
					<OrderDetails />
				</main>
			</div>
		</Suspense>
	);
}

const Loading = () => {
	return (
		<div>
			<SpinnerIcon />
		</div>
	);
};
