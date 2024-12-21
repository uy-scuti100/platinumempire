"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts } from "@/actions";
import ProductGrid from "./ProductGrid";

interface ProductGridProps {
	order: string;
}

export default function GridContainer({ order }: ProductGridProps) {
	const queryKey = ["PRODUCTS", order];
	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({
		queryKey,
		queryFn: () => fetchAllProducts(order),
	});
	return (
		<section className="pt-20 w-full px-5">
			<ProductGrid
				products={products}
				isLoading={isLoading}
				isError={isError}
			/>
		</section>
	);
}
