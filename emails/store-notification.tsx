import { formatPriceInNaira } from "@/lib/utils";
import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Img,
	Preview,
	Row,
	Section,
	Text,
} from "@react-email/components";

export interface StoreNotificationEmailProps {
	order: {
		orderNumber: string;
		customerName: string;
		email: string;
		phone: string;
		totalAmount: number;
		products: Array<{
			name: string;
			price: number;
			quantity: number;
			color: string;
			size: string;
			image?: string; // Optional image URL
		}>;
		deliveryMethod: string;
		address?: string;
		city?: string;
		state?: string;
		country?: string;
		postalCode?: string;
		shippingFee?: number;
		paymentReference: string;
	};
}

export default function StoreNotificationEmail({
	order,
}: StoreNotificationEmailProps) {
	const {
		orderNumber,
		customerName,
		email,
		phone,
		totalAmount,
		products,
		deliveryMethod,
		address,
		city,
		state,
		country,
		postalCode,
		shippingFee,
		paymentReference,
	} = order;

	return (
		<Html>
			<Head />
			<Preview>New Order #{orderNumber} Received</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>New Order Received</Heading>

					{/* Order Details Section */}
					<Section style={section}>
						<Heading style={h2}>Order Details</Heading>
						<Text>Order Number: {orderNumber}</Text>
						<Text>Payment Reference: {paymentReference}</Text>
						<Text>Total Amount: {formatPriceInNaira(totalAmount)}</Text>
					</Section>

					{/* Customer Information Section */}
					<Section style={section}>
						<Heading style={h2}>Customer Information</Heading>
						<Text>Name: {customerName}</Text>
						<Text>Email: {email}</Text>
						<Text>Phone: {phone}</Text>
					</Section>

					{/* Delivery Information Section */}
					<Section style={section}>
						<Heading style={h2}>Delivery Details</Heading>
						<Text>Method: {deliveryMethod}</Text>
						{deliveryMethod === "shipping" && (
							<>
								<Text>Address: {address}</Text>
								<Text>City: {city}</Text>
								<Text>State: {state}</Text>
								<Text>Country: {country}</Text>
								{postalCode && <Text>Postal Code: {postalCode}</Text>}
							</>
						)}
					</Section>

					{/* Products Section */}
					<Section style={section}>
						<Heading style={h2}>Products Ordered</Heading>
						{products.map((product, index) => (
							<Row key={index} style={productRow}>
								<Column style={{ paddingRight: "16px" }}>
									{/* Product Image */}
									{product.image ? (
										<Img
											src={product.image}
											alt={product.name}
											width={100}
											height={100}
											style={productImage}
										/>
									) : (
										<Text>No image available</Text>
									)}
								</Column>
								<Column>
									{/* Product Details */}
									<Text style={productText}>
										<strong>{product.name}</strong>
										<br />
										Color: {product.color}
										<br />
										Size: {product.size}
										<br />
										Quantity: {product.quantity}
										<br />
										Price:{" "}
										{formatPriceInNaira(product.price * product.quantity)}
									</Text>
								</Column>
							</Row>
						))}
					</Section>

					{/* Summary Section */}
					<Section style={section}>
						<Heading style={h2}>Order Summary</Heading>
						<Text>
							Subtotal: {formatPriceInNaira(totalAmount - (shippingFee || 0))}
						</Text>
						<Text>Shipping Fee: {formatPriceInNaira(shippingFee || 0)}</Text>
						<Text>Total: {formatPriceInNaira(totalAmount)}</Text>
					</Section>

					<Hr style={hr} />

					{/* Footer */}
					<Text style={footer}>
						This is an automated notification. Please check your admin dashboard
						for more details.
					</Text>
				</Container>
			</Body>
		</Html>
	);
}

const main = {
	backgroundColor: "#f6f9fc",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
	backgroundColor: "#ffffff",
	margin: "0 auto",
	padding: "20px 0 48px",
	marginBottom: "64px",
};

const section = {
	padding: "24px",
	borderBottom: "1px solid #e6ebf1",
};

const h1 = {
	color: "#000",
	fontSize: "24px",
	fontWeight: "600",
	lineHeight: "32px",
	margin: "16px 0",
	textAlign: "center" as const,
};

const h2 = {
	color: "#000",
	fontSize: "20px",
	fontWeight: "600",
	lineHeight: "28px",
	margin: "16px 0",
};

const productRow = {
	display: "flex",
	alignItems: "flex-start",
	marginBottom: "16px",
};

const productImage = {
	borderRadius: "8px",
	border: "1px solid #e6ebf1",
};

const productText = {
	margin: "0",
	lineHeight: "24px",
	color: "#525f7f",
};

const hr = {
	borderColor: "#e6ebf1",
	margin: "20px 0",
};

const footer = {
	color: "#8898aa",
	fontSize: "12px",
	lineHeight: "16px",
	textAlign: "center" as const,
};

// import { formatPriceInNaira } from "@/lib/utils";
// import * as React from "react";

// interface StoreNotificationEmailProps {
// 	order: {
// 		orderNumber: string;
// 		customerName: string;
// 		email: string;
// 		phone: string;
// 		totalAmount: number;
// 		products: Array<{
// 			name: string;
// 			price: number;
// 			quantity: number;
// 			color: string;
// 			size: string;
// 			image?: string; // Optional image URL
// 		}>;
// 		deliveryMethod: string;
// 		address?: string;
// 		city?: string;
// 		state?: string;
// 		country?: string;
// 		postalCode?: string;
// 		shippingFee?: number;
// 		paymentReference: string;
// 	};
// }

// export const StoreNotificationEmail: React.FC<StoreNotificationEmailProps> = ({
// 	order,
// }) => {
// 	const {
// 		orderNumber,
// 		customerName,
// 		email,
// 		phone,
// 		totalAmount,
// 		products,
// 		deliveryMethod,
// 		address,
// 		city,
// 		state,
// 		country,
// 		postalCode,
// 		shippingFee,
// 		paymentReference,
// 	} = order;

// 	return (
// 		<div className="bg-gray-100 font-sans text-gray-800 p-6 max-w-3xl mx-auto">
// 			<div className="bg-white shadow-lg rounded-none-lg p-6">
// 				{/* Header */}
// 				<h1 className="text-2xl font-bold text-center mb-4">
// 					New Order Received
// 				</h1>
// 				<p className="text-center text-gray-600 mb-6">
// 					Order Number: <strong>{orderNumber}</strong>
// 				</p>

// 				{/* Order Details */}
// 				<section className="mb-8">
// 					<h2 className="text-lg font-semibold mb-2">Order Details</h2>
// 					<p>Total Amount: {formatPriceInNaira(totalAmount)}</p>
// 					<p>Payment Reference: {paymentReference}</p>
// 				</section>

// 				{/* Customer Details */}
// 				<section className="mb-8">
// 					<h2 className="text-lg font-semibold mb-2">Customer Information</h2>
// 					<p>Name: {customerName}</p>
// 					<p>Email: {email}</p>
// 					<p>Phone: {phone}</p>
// 				</section>

// 				{/* Delivery Details */}
// 				<section className="mb-8">
// 					<h2 className="text-lg font-semibold mb-2">Delivery Details</h2>
// 					<p>Delivery Method: {deliveryMethod}</p>
// 					{deliveryMethod === "shipping" && (
// 						<>
// 							<p>Address: {address}</p>
// 							<p>City: {city}</p>
// 							<p>State: {state}</p>
// 							<p>Country: {country}</p>
// 							{postalCode && <p>Postal Code: {postalCode}</p>}
// 						</>
// 					)}
// 				</section>

// 				{/* Products */}
// 				<section className="mb-8">
// 					<h2 className="text-lg font-semibold mb-2">Products Ordered</h2>
// 					<div className="space-y-4">
// 						{products.map((product, index) => (
// 							<div
// 								key={index}
// 								className="flex items-center bg-gray-50 p-4 rounded-none-lg shadow"
// 							>
// 								{/* Product Image */}
// 								{product.image ? (
// 									<img
// 										src={product.image}
// 										alt={product.name}
// 										className="w-20 h-20 rounded-none-lg border mr-4"
// 									/>
// 								) : (
// 									<div className="w-20 h-20 rounded-none-lg bg-gray-200 flex items-center justify-center text-gray-400 text-sm mr-4">
// 										No Image
// 									</div>
// 								)}

// 								{/* Product Details */}
// 								<div>
// 									<p className="font-bold">{product.name}</p>
// 									<p>Color: {product.color}</p>
// 									<p>Size: {product.size}</p>
// 									<p>
// 										Quantity: {product.quantity} x{" "}
// 										{formatPriceInNaira(product.price)} ={" "}
// 										{formatPriceInNaira(product.price * product.quantity)}
// 									</p>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</section>

// 				{/* Summary */}
// 				<section className="mb-8">
// 					<h2 className="text-lg font-semibold mb-2">Order Summary</h2>
// 					<p>
// 						Subtotal: {formatPriceInNaira(totalAmount - (shippingFee || 0))}
// 					</p>
// 					<p>Shipping Fee: {formatPriceInNaira(shippingFee || 0)}</p>
// 					<p className="font-bold">Total: {formatPriceInNaira(totalAmount)}</p>
// 				</section>

// 				{/* Footer */}
// 				<div className="text-center text-gray-500 mt-8 border-t pt-4">
// 					<p>
// 						This is an automated notification. Please check your admin dashboard
// 						for more details.
// 					</p>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default StoreNotificationEmail;
