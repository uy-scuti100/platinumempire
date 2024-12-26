import { fetchProductBySlug, IProduct } from "@/actions/products";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import AdditionalImages from "../_components/additional-images";
import ProductComponent from "../_components/product-component";
import RelatedProductsComponent from "../_components/relatedGoods";

export type paramsType = Promise<{ slug: string }>;
export default async function page({ params }: { params: paramsType }) {
	const { slug } = await params;

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["SINGLE_PRODUCT", slug],
		queryFn: () => fetchProductBySlug(slug),
	});
	const product = await queryClient.fetchQuery({
		queryKey: ["SINGLE_PRODUCT", slug],
		queryFn: () => fetchProductBySlug(slug),
	});

	return (
		<main className="pt-28">
			<div className="mt-10">
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ProductComponent slug={slug} />
					<RelatedProductsComponent slug={slug} product={product as IProduct} />

					<AdditionalImages imageUrls={product?.imageUrls as string[]} />
				</HydrationBoundary>
			</div>
		</main>
	);
}
// slug={product.slug}
// 					type={productType || []}
// 					categories={product.categories}
// 					price={product.price}
