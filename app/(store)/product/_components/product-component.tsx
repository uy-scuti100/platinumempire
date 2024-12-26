"use client";
import { fetchProductBySlug } from "@/actions/products/index";
import { useQuery } from "@tanstack/react-query";
import ProductBreadcrumb from "./product-breadcrumb";
import ProductImageComponent from "./product-image-component";
import ProductInformationComponent from "./product-information-component";
import ProductSkeleton from "./product-skeleton";
export default function ProductComponent({ slug }: { slug: string }) {
	const { data: product, isLoading } = useQuery({
		queryKey: ["SINGLE_PRODUCT", slug],
		queryFn: () => fetchProductBySlug(slug),
	});
	const isMobile =
		typeof window !== "undefined" ? window.innerWidth < 768 : false;

	if (isLoading) {
		return Array.from({ length: 1 }).map((_, index) => (
			<ProductSkeleton key={index} />
		));
	}
	return (
		<>
			{product && (
				<div className="max-w-[1920px] mx-auto">
					<ProductBreadcrumb product={product} />
					<div className="px-4 mx-auto mt-5">
						<div className="grid h-full grid-cols-1 gap-3 md:grid-cols-3">
							<div className="w-full md:col-span-2">
								<ProductImageComponent product={product} isMobile={isMobile} />
							</div>
							<div className="w-full md:col-span-1">
								<ProductInformationComponent product={product} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
