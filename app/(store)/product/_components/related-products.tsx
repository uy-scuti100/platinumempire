"use client";

import { fetchRelatedProducts, IProduct } from "@/actions/products";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ProductCardSkeleton } from "../../products/components/ProductGrid";
import { GridTileImage } from "./misc/grid-tile";

export default function RelatedProducts({
	slug,
	type,
	categories,
	price,
}: {
	slug: string;
	type: string[];
	categories: string[];
	price: number;
}) {
	const {
		data: products,
		isLoading,
		isFetching,
		isError,
	} = useQuery<IProduct[]>({
		queryKey: ["RELATED-PRODUCTS", slug],
		queryFn: () => fetchRelatedProducts(slug, type, categories, price),
	});

	const carouselProducts = products ? [...products] : [];

	return (
		<div className="w-full px-4 mt-10 mx-auto max-w-[1920px]">
			<div className="mb-8">
				<h2 className="text-xl font-bold capitalize ">YOU MAY ALSO LIKE</h2>
			</div>
			<div className="w-full pb-6 mt-10 overflow-x-auto">
				<ul className="flex gap-4 animate-carousel">
					{carouselProducts &&
						carouselProducts.length > 0 &&
						carouselProducts.map((product, i) => (
							<li
								key={`${product.slug}${i}`}
								className="relative aspect-square h-[50vh] max-h-[375px] w-2/3 max-w-[475px] flex-none md:w-1/3"
							>
								<Link
									href={`/product/${product.slug}`}
									className="relative w-full h-[30vh] max-h-[475px] flex-none md:w-full rounded-lg"
								>
									<GridTileImage
										alt={product.name}
										label={{
											title: product.name,
											amount: product.discountedPrice
												? product.discountedPrice
												: product.price,
										}}
										className="object-cover rounded-lg"
										src={product.imageUrls[0]}
										fill
										sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
									/>
								</Link>
							</li>
						))}

					{isLoading ||
						(isFetching && (
							<div className="flex items-center justify-center w-full h-full">
								{Array.from({ length: 10 }).map((_, index) => (
									<div key={index} className="mr-4">
										<ProductCardSkeleton />
									</div>
								))}
							</div>
						))}
					{isError && (
						<div className="flex items-center justify-center w-full h-full">
							<p>Error fetching related products</p>
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}
