"use client";

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { useStore } from "@/lib/store/cart";
import { cn, formatPriceInNaira } from "@/lib/utils";
import Link from "next/link";

import { ScrollArea } from "../ui/scroll-area";

import CartProducts from "@/app/(store)/(cart)/cart/cartProducts";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "../ui/button";

interface CartComponentProps {
	isAboveLimit?: boolean;
	pathname?: string;
}

export function CartComponent({ isAboveLimit, pathname }: CartComponentProps) {
	const getCartTotal = useStore((state) => state.getCartTotal);
	const cartTotal = getCartTotal();
	const isCartOpen = useStore((state) => state.isCartOpen);
	const closeCart = useStore((state) => state.closeCart);
	const cart = useStore((state) => state.cart);

	const cartItemsCount = useStore((state) =>
		state.cart.reduce((total, item) => total + item.quantity, 0)
	);

	const ShoppingBagIcon = () => (
		<svg
			className={cn(
				`${isAboveLimit ? "text-black" : "text-white"}`,
				pathname !== "/" && "text-black",
				"duration-500 text-[20px] transition-colors ease-in-out lucide lucide-shopping-bag"
			)}
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
			<path d="M3 6h18" />
			<path d="M16 10a4 4 0 0 1-8 0" />
		</svg>
	);

	return (
		<Sheet open={isCartOpen} onOpenChange={closeCart}>
			<div
				className="relative cursor-pointer"
				onClick={() => useStore.getState().openCart()}
			>
				<ShoppingBagIcon />
				{cartItemsCount > 0 && (
					<span className="bg-custom p-2 text-white absolute w-[18px] h-[18px] rounded-full -top-3 -right-3 text-[13px] flex justify-center items-center font-bold tracking-[-0.1em]">
						{cartItemsCount}
					</span>
				)}
			</div>

			<SheetContent className="w-full h-full z-[1000] flex flex-col">
				<SheetHeader>
					<SheetTitle className="flex items-center justify-between mb-6">
						<p className="font-light uppercase tracking-[6px]">My Cart</p>
					</SheetTitle>
				</SheetHeader>

				{!cart || cartItemsCount > 0 ? (
					<>
						<div className="flex-grow overflow-hidden">
							<ScrollArea className="h-full pr-2">
								<CartProducts />
							</ScrollArea>
						</div>
						<div className="flex-shrink-0">
							<div className="py-4 text-sm text-neutral-500">
								<div className="flex items-center justify-between pb-1 mb-3 border-b border-neutral-200 ">
									<p>Taxes</p>
									{formatPriceInNaira(0.0)}
								</div>
								<div className="flex items-center justify-between pt-1 pb-1 mb-3 border-b border-neutral-200">
									<p>Shipping</p>
									<p className="text-right">Calculated at checkout</p>
								</div>
								<div className="flex items-center justify-between pt-1 pb-1 mb-3 border-b border-neutral-200">
									<p>Total</p>
									{formatPriceInNaira(cartTotal)}
								</div>
								<div>
									<CheckoutButton onClose={closeCart} />
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="flex flex-col items-center justify-center w-full mt-20">
						<ShoppingCartIcon className="w-16 h-16" />
						<p className="mt-6 text-2xl font-bold text-center ">
							Your cart is empty.
						</p>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}

function CheckoutButton({ onClose }: { onClose?: () => void }) {
	const pending = false;

	return (
		<Button asChild>
			<Link
				href={"/checkout"}
				className="block w-full py-6 px-3 text-base font-medium text-center rounded-none  opacity-90 hover:opacity-100"
				onClick={onClose}
			>
				{pending ? <LoadingDots className="bg-white" /> : "Proceed to Checkout"}
			</Link>
		</Button>
	);
}

const LoadingDots = ({ className }: { className: string }) => {
	return <div className={className}>loading ....</div>;
};
