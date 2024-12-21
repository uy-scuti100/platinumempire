import { fetchAllProducts } from "@/actions";
import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from "@tanstack/react-query";
import GridContainer from "./components/GridContainer";
export type ParamsType = {
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
};
export default async function page({
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
	const filterConditions = ['_type == "products"'];
	const orderConditions = [];

	// Handle ordering
	if (date && date !== "none") {
		orderConditions.push(`_createdAt ${date}`);
	}
	if (price && price !== "none") {
		orderConditions.push(`price ${price}`);
	}

	// Handle price range
	if (priceRange) {
		const [min, max] = priceRange.split(",").map(Number);
		filterConditions.push(`price >= ${min} && price <= ${max}`);
	}

	if (categories) {
		const categoryArray = categories.split(",");
		const categoryConditions = categoryArray.map(
			(cat) =>
				`count(categories[_type == "reference" && references(*[_type == "category" && name == "${cat}"]._id)]) > 0`
		);
		filterConditions.push(`(${categoryConditions.join(" || ")})`);
	}

	// Handle product status
	if (isNew === "true") {
		filterConditions.push("isNew == true");
	}
	if (onSale === "true") {
		filterConditions.push("onSale == true");
	}

	if (gender) {
		filterConditions.push(`gender == "${gender}"`);
	}

	// Handle references for different types and sizes
	if (clotheTypes) {
		const typesArray = clotheTypes.split(",");
		const typeConditions = typesArray.map(
			(type) =>
				`count(clotheTypes[_type == "reference" && references(*[_type == "clotheType" && name == "${type}"]._id)]) > 0`
		);
		filterConditions.push(`(${typeConditions.join(" || ")})`);
	}

	if (clotheSizes) {
		const sizesArray = clotheSizes.split(",");
		const sizeConditions = sizesArray.map(
			(size) =>
				`count(clotheSizes[_type == "reference" && references(*[_type == "clotheSize" && name == "${size}"]._id)]) > 0`
		);
		filterConditions.push(`(${sizeConditions.join(" || ")})`);
	}

	if (shoeSizes) {
		const sizesArray = shoeSizes.split(",");
		const sizeConditions = sizesArray.map(
			(size) =>
				`count(shoeSizes[_type == "reference" && references(*[_type == "shoeSize" && name == "${size}"]._id)]) > 0`
		);
		filterConditions.push(`(${sizeConditions.join(" || ")})`);
	}

	if (bagSizes) {
		const sizesArray = bagSizes.split(",");
		const sizeConditions = sizesArray.map(
			(size) =>
				`count(bagSizes[_type == "reference" && references(*[_type == "bagSize" && name == "${size}"]._id)]) > 0`
		);
		filterConditions.push(`(${sizeConditions.join(" || ")})`);
	}

	if (accessorySizes) {
		const sizesArray = accessorySizes.split(",");
		const sizeConditions = sizesArray.map(
			(size) =>
				`count(accessorySizes[_type == "reference" && references(*[_type == "accessorySize" && name == "${size}"]._id)]) > 0`
		);
		filterConditions.push(`(${sizeConditions.join(" || ")})`);
	}

	const filter = `*[${filterConditions.join(" && ")}]`;
	const order = orderConditions.length
		? ` | order(${orderConditions.join(", ")})`
		: "";

	const finalQuery = filter + order;

	console.log("Final Query:", finalQuery);

	const queryClient = new QueryClient();
	await queryClient.prefetchQuery({
		queryKey: ["PRODUCTS", finalQuery],
		queryFn: () => fetchAllProducts(finalQuery),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<GridContainer order={finalQuery} />
		</HydrationBoundary>
	);
}
