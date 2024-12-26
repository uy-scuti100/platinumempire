"use client";
import { fetchUpsellProducts, IProduct } from "@/actions/products";
import ProductCard from "@/components/globalcomponents/ProductCard";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store/cart";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartItem {
	slug: string;
	name: string;
	price: number;
	selectedColor: string;
	selectedSize: string;

	_id: string;
}

interface Cart {
	items: CartItem[];
}

export default function UpsellProducts({ cart }: { cart: Cart }) {
	const [upsellProducts, setUpsellProducts] = useState<IProduct[]>([]);
	const addToCart = useStore((state) => state.addToCart);

	useEffect(() => {
		const getUpsellData = async () => {
			// Fetch upsell products only if the cart has items
			if (cart.items.length > 0) {
				const upsellData = await fetchUpsellProducts(cart.items);
				setUpsellProducts(upsellData);
			}
		};

		getUpsellData();
	}, [cart]);

	return (
		<div className="mt-8">
			<h2 className="text-lg font-semibold mb-4">Before You Go</h2>
			<div className="grid grid-cols-2 gap-y-4 gap-x-1">
				{upsellProducts.length > 0 ? (
					upsellProducts.map((product) => (
						<div key={product._id}>
							<ProductCard product={product} />
							<Link
								href={`/product/${product.slug}`}
								className="h-[50px] w-full whitespace-nowrap shop-now-btn btn rounded-none"
							>
								View Product
							</Link>
						</div>
					))
				) : (
					<div className=" flex items-center justify-center px-4 w-full col-span-2 mt-10 ">
						<Button asChild className="rounded-none shop-now-btn btn px-4">
							<Link href={"/products"}>Browse other trendy Products</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
