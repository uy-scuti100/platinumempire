"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { useStore } from "@/lib/store/cart";
import { formatPriceInNaira } from "@/lib/utils";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import CartItems from "./_components/cart-items";
import { Header } from "./_components/header";
import UpsellProducts from "./_components/upsell-products";

const CheckoutForm = dynamic(
	() => import("./_components/checkout-form").then((mod) => mod.CheckoutForm),
	{ ssr: false }
);

interface CartItem {
	image: string;
	inStock: boolean;
	name: string;
	price: number;
	quantity: number;
	selectedColor: string;
	selectedSize: string;
	slug: string;
	uniqueKey: string;
	_id: string;
}

export default function Page() {
	const cartTotal = useStore((state) => state.getCartTotal());
	const cartItems = useStore((state) => state.cart);

	// Check if cart exists and has items
	const hasCartItems = cartItems && cartItems.length > 0;

	// Map cartItems to the CartItem structure
	const transformedCartItems: CartItem[] = cartItems.map((item) => ({
		image: item.image,
		inStock: item.inStock ?? false,
		name: item.name,
		price: item.price,
		quantity: item.quantity,

		selectedColor: item.selectedColor || "",
		selectedSize: item.selectedSize || "",
		slug: item.slug,
		uniqueKey: item.uniqueKey,
		_id: item._id,
	}));
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<main className="min-h-screen max-w-4xl mx-auto">
			<Header />
			<div className="py-8 px-4 sm:px-6 lg:px-8">
				<Accordion
					type="single"
					collapsible
					className="w-full border-y bg-slate-50"
				>
					<AccordionItem value="cart-items" className="border-none">
						<AccordionTrigger className="hover:no-underline">
							<div className="flex items-center justify-between w-full">
								<h3>Order Summary</h3>
								<p className="font-bold text-lg">
									{formatPriceInNaira(cartTotal)}
								</p>
							</div>
						</AccordionTrigger>
						<AccordionContent>
							<CartItems />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
				<div className="grid grid-cols-1 gap-8 mt-6">
					<div>
						<CheckoutForm />
						<div className="h-[1px] bg-gray-200 w-full my-8" />
						<div>
							{/* Pass the transformed cart items to UpsellProducts */}
							{hasCartItems && (
								<UpsellProducts cart={{ items: transformedCartItems }} />
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
