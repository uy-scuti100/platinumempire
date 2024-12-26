"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/lib/store/cart";
import CartProducts from "../../(cart)/cart/cartProducts";

export default function CartItems() {
	const cart = useStore((state) => state.cart);
	const getCartTotal = useStore((state) => state.getCartTotal);
	const cartItemsCount = useStore((state) =>
		state.cart.reduce((total, item) => total + item.quantity, 0)
	);

	return (
		<div>
			{!cart || cartItemsCount > 0 ? (
				<div className="flex-grow overflow-hidden">
					<ScrollArea className="h-full pr-2">
						<CartProducts />
					</ScrollArea>
				</div>
			) : null}
		</div>
	);
}
