import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import ProductComponent from "../components/product-component";
import { fetchProductBySlug } from "@/actions";
export type paramsType = Promise<{ slug: string }>;
export default async function page({ params }: { params: paramsType }) {
	const { slug } = await params;

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["singleproduct", slug],
		queryFn: () => fetchProductBySlug(slug),
	});

	return (
		<main className="pb-40 pt-28">
			<div className="mt-10">
				<HydrationBoundary state={dehydrate(queryClient)}>
					<ProductComponent slug={slug} />
				</HydrationBoundary>
			</div>
		</main>
	);
}
