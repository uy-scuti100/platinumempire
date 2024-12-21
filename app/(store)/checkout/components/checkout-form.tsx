"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

export default function CheckoutForm() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");

	const config = {
		reference: new Date().getTime().toString(),
		email: email,
		amount: 10000, // Amount is in the country's lowest currency. E.g. Cents for USD
		publicKey: "YOUR_PAYSTACK_PUBLIC_KEY",
	};

	const initializePayment = usePaystackPayment(config);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		initializePayment({
			onSuccess: () => {
				// Payment successful
				console.log("Payment successful");
			},
			onClose: () => {
				// Payment failed or was closed
				console.log("Payment failed or closed");
			},
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white shadow overflow-hidden sm:rounded-lg"
		>
			<div className="px-4 py-5 sm:p-6">
				<div className="grid grid-cols-6 gap-6">
					<div className="col-span-6 sm:col-span-3">
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Full name
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>

					<div className="col-span-6 sm:col-span-3">
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email address
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>

					<div className="col-span-6">
						<label
							htmlFor="address"
							className="block text-sm font-medium text-gray-700"
						>
							Address
						</label>
						<input
							type="text"
							name="address"
							id="address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							required
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>

					<div className="col-span-6 sm:col-span-3">
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Phone number
						</label>
						<input
							type="tel"
							name="phone"
							id="phone"
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
							className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
						/>
					</div>
				</div>
			</div>
			<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
				<button
					type="submit"
					className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					Pay Now
				</button>
			</div>
		</form>
	);
}
