import { fetchTwoFromEachCategory } from "@/actions";
import Categories from "../(homeComponents)/Categories";
import HeroSection from "../(homeComponents)/heroSection";
import TwoFromEach from "../(homeComponents)/twofromeach";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
	const categories = ["accessories", "wears", "shoes", "bags"];
	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["FETCHTWO", categories],
		queryFn: () => fetchTwoFromEachCategory(categories),
	});

	return (
		<main>
			<HeroSection />
			<HydrationBoundary state={dehydrate(queryClient)}>
				<TwoFromEach categories={categories} />
			</HydrationBoundary>
			<Categories />
		</main>
	);
}
