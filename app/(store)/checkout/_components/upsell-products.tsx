"use client";
import { fetchUpsellProducts } from "@/actions/products";
import ProductCard from "@/components/globalcomponents/ProductCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ProductCardSkeleton } from "../../products/components/ProductGrid";

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
	const { data: upsellProducts = [], isLoading: loading } = useQuery({
		queryKey: ["upsellProducts", cart.items],
		queryFn: () => fetchUpsellProducts(cart.items),
		enabled: cart.items.length > 0,
	});
	return (
		<div className="mt-8">
			<div className="grid grid-cols-2 gap-y-4 gap-x-1">
				{loading
					? Array.from({ length: 2 }, (_, i) => <ProductCardSkeleton key={i} />)
					: null}
			</div>

			{upsellProducts.length > 0 && (
				<h2 className="text-lg font-semibold mb-6">
					Check These Out Before You Go
				</h2>
			)}
			<div className="grid grid-cols-2 gap-y-4 gap-x-1">
				{upsellProducts.length > 0 ? (
					upsellProducts.map((product) => (
						<>
							<div key={product._id}>
								<ProductCard product={product} />
							</div>
						</>
					))
				) : (
					<div className=" flex items-center justify-center px-4 w-full col-span-2 mt-10 ">
						<Button asChild className="rounded shop-now-btn btn px-4">
							<Link href={"/products"}>Browse other trendy Products</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
} // const addToCart = useStore((state) => state.addToCart);

{
	/* <Button asChild variant={"link"}> */
}
{
	/* <Link
								href={`/product/${product.slug}`}
								className="h-[50px] text-sm underline pt-1"
							>
								View Product
							</Link> */
}
{
	/* </Button> */
}
