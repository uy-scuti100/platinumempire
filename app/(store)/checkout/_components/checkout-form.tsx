"use client";

import {
	Country,
	createOrder,
	getStatesAndCountriesWithErrorHandling,
	sendNotification,
	State,
} from "@/actions/payment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/lib/store/cart";
import { formatPriceInNaira } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaShippingFast, FaStore } from "react-icons/fa";
import { usePaystackPayment } from "react-paystack";
import { z } from "zod";
import { CheckoutWarning } from "./alert";
import CartItems from "./cart-items";
import FormErrorSummary from "./form-error";

// Define the form schema with Zod
const checkoutSchema = z
	.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email address"),
		phoneNumber: z.string().min(11, "Phone number must be at least 11 digits"),
		deliveryMethod: z.enum(["shipping", "pickup"]),
		orderNote: z.string().optional(),
	})
	.and(
		z.discriminatedUnion("deliveryMethod", [
			z.object({
				deliveryMethod: z.literal("shipping"),
				address: z.string().min(1, "Address is required"),
				apartment: z.string().optional(),
				city: z.string().min(1, "City is required"),
				country: z.string().min(1, "Country is required"),
				state: z
					.string()
					.nullable()
					.superRefine((val, ctx) => {
						if (ctx.path.includes("country") && val === null) {
							ctx.addIssue({
								code: z.ZodIssueCode.custom,
								message: "State is required for Nigeria",
							});
						}
					}),
				postalCode: z.string().optional(),
			}),
			z.object({
				deliveryMethod: z.literal("pickup"),
			}),
		])
	);

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
	const [states, setStates] = useState<State[]>([]);
	const [countries, setCountries] = useState<Country[]>([]);
	const [shippingFee, setShippingFee] = useState(0);
	const [printing, setPrinting] = useState(false);

	const cart = useStore((state) => state.cart);
	const getCartTotal = useStore((state) => state.getCartTotal);
	const cartTotal = getCartTotal();
	const router = useRouter();

	// Initialize React Hook Form
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		defaultValues: {
			deliveryMethod: "shipping",
		},
	});

	const deliveryMethod = watch("deliveryMethod");
	const selectedState = watch("state");
	const selectedCountry = watch("country");

	// Fetch states on component mount
	useEffect(() => {
		const fetchStatesandCountries = async () => {
			const res = await getStatesAndCountriesWithErrorHandling();
			if (res) {
				setStates(res.states);
				setCountries(res.countries);
			}
		};
		fetchStatesandCountries();
	}, []);

	// Update shipping fee when state or delivery method changes
	const calculateShippingFee = useCallback(() => {
		if (deliveryMethod === "pickup") {
			setShippingFee(0);
			return;
		}

		if (selectedCountry && selectedCountry !== "Nigeria") {
			const countryData = countries.find(
				(country) => country.name === selectedCountry
			);
			setShippingFee(countryData?.price || 0);
		} else if (selectedCountry === "Nigeria" && selectedState) {
			const stateData = states.find((state) => state.name === selectedState);
			setShippingFee(stateData?.price || 0);
		}
	}, [selectedState, selectedCountry, deliveryMethod, states, countries]);

	useEffect(() => {
		calculateShippingFee();
	}, [calculateShippingFee]);
	const totalAmount = cartTotal + shippingFee;

	// Configure Paystack
	const initializePayment = usePaystackPayment({
		reference: `ORDER_${new Date().getTime()}`,
		email: watch("email"),
		amount: totalAmount * 100,
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_TEST_PUBLIC_KEY || "",
		metadata: {
			cart: cart,
			totalAmount: totalAmount,
			shippingFee: shippingFee,
			deliveryMethod: deliveryMethod,
			address: watch("address"),
			apartment: watch("apartment"),
			city: watch("city"),
			country: watch("country"),
			state: watch("state"),
			postalCode: watch("postalCode"),
			custom_fields: [
				{
					display_name: "Customer Name",
					variable_name: "customer_name",

					value: `${watch("firstName")} ${watch("lastName")}`,
				},
				{
					display_name: "Customer Email",
					variable_name: "customer_email",
					value: watch("email"),
				},
				{
					display_name: "Customer Phone Number",
					variable_name: "customer_phone",
					value: watch("phoneNumber"),
				},
				{
					display_name: "Customer Address",
					variable_name: "customer_address",
					value: watch("address"),
				},
				{
					display_name: "Customer Apartment",
					variable_name: "customer_apartment",
					value: watch("apartment"),
				},
				{
					display_name: "Customer City",
					variable_name: "customer_city",
					value: watch("city"),
				},
				{
					display_name: "Customer Country",
					variable_name: "customer_country",
					value: watch("country"),
				},
				{
					display_name: "Customer State",
					variable_name: "customer_state",
					value: watch("state"),
				},
			],
		},
	});

	// Form submission handler
	const onSubmit = async (data: CheckoutFormData) => {
		initializePayment({
			onSuccess: async (reference: any) => {
				try {
					// Create formatted cart data with proper references
					const cartData = cart.map((item) => ({
						product: {
							_type: "reference",
							_ref: item._id,
						},
						quantity: item.quantity,
						price: item.price,

						productDetails: {
							name: item.name,
							slug: item.slug,
							image: item.image,
							color: item.selectedColor,
							size: item.selectedSize,
						},
					}));

					const orderDetails = {
						customerName: `${data.firstName} ${data.lastName}`,
						email: data.email,
						phone: data.phoneNumber,
						deliveryMethod: data.deliveryMethod,
						orderNote: data.orderNote,
						shippingFee,
						totalAmount,
						paymentReference: reference.reference,
						paymentStatus: "completed",
						orderNumber: `PFH${Date.now().toString().slice(-6)}`,
						products: cartData,
						...(data.deliveryMethod === "shipping" && {
							address: data.address,
							apartment: data.apartment || "",
							city: data.city,
							state: data.state,
							country: data.country,
							postalCode: data.postalCode || "",
						}),
					};
					setPrinting(true);
					// Prepare receipt data
					const receiptData = {
						...orderDetails,
						orderNote: data.orderNote,
						issueDate: new Date().toISOString(),
						products: cartData.map((item) => ({
							...item.productDetails,
							quantity: item.quantity,
							price: item.price,
							subtotal: item.quantity * item.price,
						})),
					};

					// First redirect to thank you page
					router.push(
						`/thank-you?data=${encodeURIComponent(JSON.stringify(receiptData))}`
					);

					// Then create order asynchronously
					createOrder(orderDetails).catch((error) => {
						console.error("Failed to create order:", error);
						// Implement retry mechanism here if needed
					});
					sendNotification(receiptData).catch((error) => {
						console.error("Failed to send  notifications:", error);
						// Implement retry mechanism here if needed
					});
				} catch (error) {
					console.error("Error in payment flow:", error);
				}
			},
			onClose: () => {
				console.warn("Payment closed");
			},
		});
	};

	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;
	return (
		<>
			{printing && (
				<div className="flex justify-center items-center h-screen fixed inset-0 z-50 bg-black/90 text-white">
					<div className="text-center">
						<h1 className="text-3xl font-extrabold mb-6 animate-pulse">
							Preparing Your Order Details
						</h1>
						<p className="text-lg text-gray-300">
							We're finalizing your purchase and generating your receipt. Just a
							moment...
						</p>
						<div className="mt-4 flex items-center justify-center w-full">
							<Loader className="h-10 w-10 animate-spin duration-200" />
						</div>
					</div>
				</div>
			)}
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				{/* Personal Information */}
				<div className="grid grid-cols-2 gap-4">
					<div>
						<Label htmlFor="firstName">First Name</Label>
						<Input
							className="rounded-none"
							id="firstName"
							{...register("firstName")}
						/>
						{errors.firstName && (
							<p className="text-red-500 text-sm mt-1">
								{errors.firstName.message}
							</p>
						)}
					</div>
					<div>
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							className="rounded-none"
							id="lastName"
							{...register("lastName")}
						/>
						{errors.lastName && (
							<p className="text-red-500 text-sm mt-1">
								{errors.lastName.message}
							</p>
						)}
					</div>
				</div>

				<div>
					<Label htmlFor="email">Email</Label>
					<Input
						className="rounded-none"
						id="email"
						type="email"
						{...register("email")}
					/>
					{errors.email && (
						<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
					)}
				</div>

				<div>
					<Label htmlFor="phoneNumber">Phone Number</Label>
					<Input
						className="rounded-none"
						id="phoneNumber"
						type="tel"
						{...register("phoneNumber")}
					/>
					{errors.phoneNumber && (
						<p className="text-red-500 text-sm mt-1">
							{errors.phoneNumber.message}
						</p>
					)}
				</div>

				{/* Delivery Method Selection */}
				<div>
					<Label>Delivery Method</Label>
					<RadioGroup
						value={deliveryMethod}
						onValueChange={(value: "shipping" | "pickup") => {
							setValue("deliveryMethod", value);
						}}
						className="flex border flex-col p-2"
					>
						<div className="flex items-center justify-between space-x-2 p-2">
							<div className="flex items-center gap-1 justify-between w-full">
								<RadioGroupItem value="shipping" id="shipping" />
								<Label
									htmlFor="shipping"
									className="flex-1 flex w-full justify-between items-center gap-1 cursor-pointer"
								>
									<span>Shipping </span>
									<FaShippingFast />
								</Label>
							</div>
						</div>
						<div className="flex items-center justify-between space-x-2 p-2">
							<div className="flex items-center gap-1 justify-between w-full">
								<RadioGroupItem value="pickup" id="pickup" />
								<Label
									htmlFor="pickup"
									className="flex-1 cursor-pointer flex w-full justify-between items-center gap-1"
								>
									<span>Store Pickup</span>
									<FaStore />
								</Label>
							</div>
						</div>
					</RadioGroup>
				</div>

				{/* Shipping Address - Only show if delivery method is shipping */}
				{deliveryMethod === "shipping" && (
					<>
						<div>
							<Label htmlFor="country">Country</Label>
							<Select
								onValueChange={(value) => setValue("country", value)}
								value={selectedCountry}
							>
								<SelectTrigger className="w-full rounded-none">
									<SelectValue placeholder="Select Country" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{countries?.map((option) => (
											<SelectItem key={option.name} value={option.name}>
												{option.name}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>

							{(errors as any).country && (
								<p className="text-red-500 text-sm mt-1">
									{(errors as any).country?.message}
								</p>
							)}
						</div>
						{selectedCountry === "Nigeria" && (
							<div>
								<Label htmlFor="state">State</Label>
								<Select
									onValueChange={(value) => setValue("state", value)}
									value={selectedState || undefined}
								>
									<SelectTrigger className="w-full rounded-none">
										<SelectValue placeholder="Select State" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{states?.map((option) => (
												<SelectItem key={option.name} value={option.name}>
													{option.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
								{(errors as any).state && (
									<p className="text-red-500 text-sm mt-1">
										{(errors as any).state?.message}
									</p>
								)}
							</div>
						)}

						<div>
							<Label htmlFor="address">Address</Label>
							<Input
								className="rounded-none"
								id="address"
								{...register("address")}
							/>
							{(errors as any).address && (
								<p className="text-red-500 text-sm mt-1">
									{(errors as any).address?.message}
								</p>
							)}{" "}
						</div>

						<div>
							<Label htmlFor="apartment">
								Apartment, suite, etc. (optional)
							</Label>
							<Input
								className="rounded-none"
								id="apartment"
								{...register("apartment")}
							/>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="city">City</Label>
								<Input
									className="rounded-none"
									id="city"
									{...register("city")}
								/>

								{(errors as any).city && (
									<p className="text-red-500 text-sm mt-1">
										{(errors as any).city?.message}
									</p>
								)}
							</div>
							<div>
								<Label htmlFor="postalCode">Postal Code (optional)</Label>
								<Input
									className="rounded-none"
									id="postalCode"
									{...register("postalCode")}
								/>
							</div>
						</div>

						<div className="w-full">
							<Label htmlFor="notes">
								Order special notes or instructions (optional)
							</Label>
							<Textarea
								className="rounded-none min-h-28 resize-none placeholder:text-neutral-500 placeholder:text-sm"
								id="notes"
								{...register("orderNote")}
								placeholder="Notes about your order, e.g. special notes for delivery."
							/>
						</div>
						<div>
							<CheckoutWarning />
						</div>
					</>
				)}

				{/* Order Summary */}
				<div className="py-10">
					<h2 className="text-lg font-semibold mb-4">Order Summary</h2>
					<CartItems />
				</div>

				{/* Order Totals */}
				<div className="text-sm ">
					<div className="flex items-center justify-between pb-1 mb-3 border-b border-neutral-200">
						<p className="text-neutral-500">Subtotal</p>
						{formatPriceInNaira(cartTotal)}
					</div>
					<div className="flex items-center justify-between pb-1 mb-3 border-b border-neutral-200">
						<p className="text-neutral-500">Shipping Fee</p>
						{deliveryMethod === "pickup" ? (
							<p>Free</p>
						) : selectedCountry === "Nigeria" && !selectedState ? (
							<p>Select state to calculate</p>
						) : (
							<p>{formatPriceInNaira(shippingFee)}</p>
						)}
					</div>

					<div className="flex items-center justify-between pt-1 pb-1 mb-3 border-b border-neutral-200">
						<p className="text-neutral-500">Total</p>
						<p className="font-black">{formatPriceInNaira(totalAmount)}</p>
					</div>
				</div>

				<Button
					type="submit"
					className="w-full h-[50px] show-now-btn btn rounded-none font-black"
				>
					Pay Now
				</Button>
				<FormErrorSummary
					errors={errors as Record<string, { message: string }>}
				/>
			</form>
		</>
	);
}

// const onSubmit = async (data: CheckoutFormData) => {
// 	const shippingFeeNum = shippingFee;
// 	const totalAmountNum = totalAmount;
// 	const orderData = new FormData();
// 	orderData.append("customerName", `${data.firstName} ${data.lastName}`);
// 	orderData.append("email", data.email);
// 	orderData.append("phone", data.phoneNumber);
// 	orderData.append("deliveryMethod", data.deliveryMethod);
// 	orderData.append("shippingFee", shippingFeeNum.toString());
// 	orderData.append("totalAmount", totalAmountNum.toString());
// 	orderData.append("paymentReference", reference.reference);
// 	orderData.append("paymentStatus", "completed");
// 	// Convert cart into a properly formatted JSON string
// 	orderData.append(
// 		"products",
// 		JSON.stringify(
// 			cart.map((item) => ({
// 				productSlug: item.slug,
// 				productId: item._id,
// 				productName: item.name,
// 				quantity: item.quantity,
// 				price: item.price,
// 			}))
// 		)
// 	);
// 	if (data.deliveryMethod === "shipping") {
// 		orderData.append("address", data.address);
// 		orderData.append("apartment", data.apartment || "");
// 		orderData.append("city", data.city);
// 		orderData.append("state", data.state || "");
// 		orderData.append("country", data.country);
// 		orderData.append("postalCode", data.postalCode || "");
// 	}

// 	// Convert FormData to an object for logging
// 	const formDataObject: { [key: string]: any } = {};
// 	orderData.forEach((value, key) => {
// 		formDataObject[key] = value;
// 	});
// 	console.log("Order Data:", formDataObject);
// };
// initializePayment({
// 	onSuccess: async (reference: any) => {
// 		try {
// 			// Ensure numeric values are passed correctly
// 			const shippingFeeNum = shippingFee;
// 			const totalAmountNum = totalAmount;
// 			const orderData = new FormData();
// 			orderData.append(
// 				"customerName",
// 				`${data.firstName} ${data.lastName}`
// 			);
// 			orderData.append("email", data.email);
// 			orderData.append("phone", data.phoneNumber);
// 			orderData.append("deliveryMethod", data.deliveryMethod);
// 			orderData.append("shippingFee", shippingFeeNum.toString());
// 			orderData.append("totalAmount", totalAmountNum.toString());
// 			orderData.append("paymentReference", reference.reference);
// 			orderData.append("paymentStatus", "completed");
// 			// Convert cart into a properly formatted JSON string
// 			orderData.append(
// 				"products",
// 				JSON.stringify(
// 					cart.map((item) => ({
// 						productSlug: item.slug,
// 						productId: item._id,
// 						productName: item.name,
// 						quantity: item.quantity,
// 						price: item.price,
// 					}))
// 				)
// 			);
// 			if (data.deliveryMethod === "shipping") {
// 				orderData.append("address", data.address);
// 				orderData.append("apartment", data.apartment || "");
// 				orderData.append("city", data.city);
// 				orderData.append("state", data.state);
// 				orderData.append("country", data.country);
// 				orderData.append("postalCode", data.postalCode || "");
// 			}
// 			const result = await createOrder(orderData);
// 			if (result.success) {
// 				const orderDetails = {
// 					orderId: result.orderId,
// 					reference: reference.reference,
// 					customerName: `${data.firstName} ${data.lastName}`,
// 					email: data.email,
// 					deliveryMethod: data.deliveryMethod,
// 					date: new Date().toISOString(),
// 				};
// 				router.push(
// 					`/thank-you?data=${encodeURIComponent(JSON.stringify(orderDetails))}`
// 				);
// 			} else {
// 				console.error("Failed to create order:", result.error);
// 			}
// 		} catch (error) {
// 			console.error("Error processing order:", error);
// 		}
// 		// console.log(data);
// 	},
// 	onClose: () => {
// 		console.log("Payment closed");
// 	},
// });
