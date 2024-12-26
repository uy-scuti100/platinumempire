"use client";

import { IProduct } from "@/actions/products";
import { useState } from "react";

import {
	DoubleView,
	FourGridView,
	SingleView,
	ThreeGridView,
} from "@/providers/Icons/ViewButtons";

import ProductCard from "@/components/globalcomponents/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { ProductFilter } from "./productFilters";

interface ProductGridProps {
	productCount: number;
	products: IProduct[] | undefined;
	isLoading: boolean;
	isError: boolean;
}

export default function ProductGrid({
	productCount,
	products,
	isError,
	isLoading,
}: ProductGridProps) {
	const [view, setView] = useState("double");

	if (isError) {
		return <div>Error...</div>;
	}

	return (
		<>
			<section className="max-w-5xl mx-auto">
				<div className="sticky md:top-[116px] top-[100px] z-50 bg-white flex justify-between items-center py-4 my-10 border-b">
					<MobileControls setView={setView} view={view} />
					<div className="text-sm">
						<span className="font-semibold">{productCount ?? 0}</span> product
						{(productCount ?? 0) > 1 ? "s" : ""} found
					</div>
					<div>
						<ProductFilter />
					</div>
				</div>

				{isLoading && (
					<div className="grid max-w-5xl grid-cols-2 gap-1 mx-auto">
						{Array(4)
							.fill(0)
							.map((_, i) => (
								<ProductCardSkeleton key={i} />
							))}
					</div>
				)}

				{products && products.length > 0 ? (
					<div
						className={`grid gap-x-1 gap-y-10 mt-5 ${
							view === "double"
								? "grid-cols-2"
								: view === "triple"
									? "grid-cols-3"
									: view === "quadruple"
										? "grid-cols-4"
										: "grid-cols-1"
						}`}
					>
						{products.map((product) => {
							return <ProductCard key={product._id} product={product} />;
						})}
					</div>
				) : (
					<div className="flex flex-col items-center justify-start min-h-screen gap-10 mt-20">
						<h3 className="text-xl font-light text-center">
							No products found for this category{" "}
						</h3>

						<div>
							<Button asChild className="rounded-none  shop-now-btn btn">
								<Link href={"/products"}>Browse other trendy Products</Link>
							</Button>
						</div>
					</div>
				)}
			</section>
		</>
	);
}
const MobileControls = ({
	setView,
	view,
}: {
	setView: React.Dispatch<React.SetStateAction<string>>;
	view: string;
}) => {
	return (
		<>
			<div className="flex items-center justify-between ">
				<div className="flex space-x-4">
					<DoubleView setView={() => setView("double")} view={view} />
					<SingleView setView={() => setView("single")} view={view} />

					<ThreeGridView setView={() => setView("triple")} view={view} />

					<FourGridView setView={() => setView("quadruple")} view={view} />
				</div>
			</div>
		</>
	);
};

export const ProductCardSkeleton = () => (
	<div className="flex flex-col gap-2">
		<Skeleton className="w-full md:h-[300px] h-[250px] relative overflow-hidden rounded-none "></Skeleton>
		<div className="flex flex-col gap-1">
			<Skeleton className="w-full h-6 rounded-none "></Skeleton>
			<Skeleton className="w-full h-4 rounded-none "></Skeleton>
		</div>
	</div>
);
