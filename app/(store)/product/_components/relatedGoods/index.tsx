import { fetchRelatedProducts, IProduct } from "@/actions/products";
import { QueryClient } from "@tanstack/react-query";
import RelatedProducts from "../related-products";

interface RelatedProductsProps {
	slug: string;
	product: IProduct;
}
export default async function RelatedProductsComponent({
	slug,
	product,
}: RelatedProductsProps) {
	const queryClient = new QueryClient();
	const { categories = [], price } = product || {};
	const productType = product?.clotheTypes || [];

	await queryClient.prefetchQuery({
		queryKey: ["RELATED-PRODUCTS", slug],
		queryFn: () =>
			fetchRelatedProducts(slug, productType, categories, price as number),
	});

	return (
		<div>
			<RelatedProducts
				slug={slug}
				type={productType}
				categories={categories}
				price={price as number}
			/>
		</div>
	);
}
