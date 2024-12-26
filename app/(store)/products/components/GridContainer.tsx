"use client";
import { fetchAllProducts, IProduct } from "@/actions/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ProductGrid, { ProductCardSkeleton } from "./ProductGrid";

const PRODUCTS_PER_PAGE = 4;

interface ProductGridProps {
	order: string;
}

export default function GridContainer({ order }: ProductGridProps) {
	const { ref, inView } = useInView({
		threshold: 0,
	});

	const fetchProducts = async ({ pageParam = 0 }) => {
		try {
			const start = pageParam * PRODUCTS_PER_PAGE;

			const { products, totalCount } = await fetchAllProducts(
				order,
				start,
				PRODUCTS_PER_PAGE
			);

			return {
				productCount: totalCount,
				products,
				hasMore: products.length === PRODUCTS_PER_PAGE,
			};
		} catch (error) {
			console.error("Error fetching products:", error);
			return {
				products: [],
				productCount: 0,
				hasMore: false,
			};
		}
	};

	const {
		data,
		fetchNextPage,
		isLoading,
		isError,
		hasNextPage,
		isFetchingNextPage,
	} = useInfiniteQuery({
		queryKey: ["CONTINOUS_INFINITE_PRODUCTS", order],
		queryFn: fetchProducts,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => {
			if (!lastPage || !Array.isArray(lastPage.products)) return undefined;
			return lastPage.hasMore ? pages.length : undefined;
		},
	});

	const allProducts =
		data?.pages?.reduce((acc, page) => {
			if (page && Array.isArray(page.products)) {
				return [...acc, ...page.products];
			}
			return acc;
		}, [] as IProduct[]) ?? [];

	const totalProductCount = data?.pages?.[0]?.productCount ?? 0;

	useEffect(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

	return (
		<section className="w-full px-5 pt-20">
			<ProductGrid
				productCount={totalProductCount}
				products={allProducts}
				isLoading={isLoading}
				isError={isError}
			/>

			{isFetchingNextPage && (
				<div className="flex justify-center w-full py-8">
					<div className="grid max-w-5xl grid-cols-2 gap-1 mx-auto">
						{Array(2)
							.fill(0)
							.map((_, i) => (
								<ProductCardSkeleton key={i} />
							))}
					</div>
				</div>
			)}

			<div ref={ref} className="w-full h-10" aria-hidden="true" />

			{!hasNextPage && allProducts.length > 0 && (
				<p className="py-8 text-center text-gray-500">
					You have reached the end of the products.
				</p>
			)}
		</section>
	);
}
