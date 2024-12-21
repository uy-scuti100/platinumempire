"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchProductBySlug } from "@/actions/index";
import ProductSkeleton from "./product-skeleton";
import ProductBreadcrumb from "./product-breadcrumb";
import ProductImageComponent from "./product-image-component";
import ProductInformationComponent from "./product-information-component";
import { useMediaQuery } from "@/lib/useprefferedMotion";
export default function ProductComponent({ slug }: { slug: string }) {
	const { data: product, isLoading } = useQuery({
		queryKey: ["singleproduct", slug],
		queryFn: () => fetchProductBySlug(slug),
	});
	const isMobile = useMediaQuery("(max-width: 568px)");

	if (isLoading) {
		return <ProductSkeleton />;
	}
	return (
		<>
			{product && (
				<div className="min-h-screen max-w-[1920px] mx-auto">
					<ProductBreadcrumb product={product} />
					<div className="mx-auto mt-5 px-4">
						<div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
							<div className="md:col-span-2 w-full">
								<ProductImageComponent product={product} isMobile={isMobile} />
							</div>
							<div className="md:col-span-1 w-full">
								<ProductInformationComponent
									product={product}
									isMobile={isMobile}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
