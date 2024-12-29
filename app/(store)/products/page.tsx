import { fetchAllProducts } from "@/actions/products";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import GridContainer from "./components/GridContainer";

// Define the expected parameter types
export type ParamsType = Promise<{
	date?: string;
	price?: string;
	priceRange?: string;
	categories?: string;
	isNew?: string;
	gender?: string;
	onSale?: string;
	clotheTypes?: string;
	clotheSizes?: string;
	shoeSizes?: string;
	bagSizes?: string;
	accessorySizes?: string;
}>;

export default async function Page({
	searchParams,
}: {
	searchParams: ParamsType;
}) {
	const {
		date,
		price,
		priceRange,
		categories,
		isNew,
		onSale,
		clotheTypes,
		clotheSizes,
		shoeSizes,
		bagSizes,
		accessorySizes,
		gender,
	} = await searchParams;

	const filterConditions: string[] = ['_type == "products"'];
	const orderConditions: string[] = [];

	// Handle ordering based on date
	if (date && date !== "none") {
		orderConditions.push(`_createdAt ${date}`);
	}

	// Handle ordering based on price
	if (price && price !== "none") {
		orderConditions.push(`price ${price}`);
	}

	// Handle price range
	if (typeof priceRange === "string") {
		const [min, max] = priceRange.split(",").map(Number);
		filterConditions.push(`price >= ${min} && price <= ${max}`);
	}

	// Handle category filtering
	if (categories && typeof categories === "string") {
		const categoryArray = categories.split(",");
		const categoryConditions = categoryArray.map(
			(cat) =>
				`count(categories[_type == "reference" && references(*[_type == "category" && name == "${cat}"]._id)]) > 0`
		);
		filterConditions.push(`(${categoryConditions.join(" || ")})`);
	}

	// Handle "isNew" filter
	if (isNew === "true") {
		filterConditions.push("isNew == true");
	}

	// Handle "onSale" filter
	if (onSale === "true") {
		filterConditions.push("onSale == true");
	}

	// Handle gender filter
	if (gender) {
		filterConditions.push(`gender == "${gender}"`);
	}

	// Handle clothe types filter
	if (clotheTypes) {
		const typesArray = Array.isArray(clotheTypes)
			? clotheTypes
			: clotheTypes.split(",");
		const typeConditions = typesArray.map(
			(type) =>
				`count(clotheTypes[_type == "reference" && references(*[_type == "clotheType" && name == "${type}"]._id)]) > 0`
		);
		filterConditions.push(`(${typeConditions.join(" || ")})`);
	}

	const handleSizeFilter = (sizes: string | undefined, type: string) => {
		if (!sizes || typeof sizes !== "string") return;

		const sizesArray = sizes.split(",");

		if (type === "shoeSizes") {
			// Handle shoe sizes as direct number array
			const sizeConditions = sizesArray.map(
				(size) => `count(${type}[@ == ${size}]) > 0`
			);
			filterConditions.push(`(${sizeConditions.join(" || ")})`);
		} else {
			// Handle other sizes as references
			const sizeConditions = sizesArray.map(
				(size) =>
					`count(${type}[_type == "reference" && references(*[_type == "${type.slice(
						0,
						-1
					)}" && name == "${size}"]._id)]) > 0`
			);
			filterConditions.push(`(${sizeConditions.join(" || ")})`);
		}
	};

	// Usage remains the same
	handleSizeFilter(clotheSizes, "clotheSizes");
	handleSizeFilter(shoeSizes, "shoeSizes");
	handleSizeFilter(bagSizes, "bagSizes");
	handleSizeFilter(accessorySizes, "accessorySizes");

	// Construct the final filter and order queries
	const filter = `*[${filterConditions.join(" && ")}]`;
	const order = orderConditions.length
		? ` | order(${orderConditions.join(", ")})`
		: "";

	const finalQuery = filter + order;
	console.log(finalQuery);

	const PRODUCTS_PER_PAGE = 4; // Define the same limit as in GridContainer
	const start = 0; // Start with the first page

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["INFINITE_PRODUCTS", finalQuery],
		queryFn: () => fetchAllProducts(finalQuery, start, PRODUCTS_PER_PAGE),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<GridContainer order={finalQuery} />
		</HydrationBoundary>
	);
}
