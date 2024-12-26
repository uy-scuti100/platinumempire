// search.ts

import { client } from "@/sanity/lib/client";
import { IProduct } from "../products";

interface SearchParams {
	searchTerm: string;
	limit?: number;
	offset?: number;
}

export async function searchProducts({
	searchTerm,
	limit = 12,
	offset = 0,
}: SearchParams) {
	// Split and filter the search term
	const searchTerms = searchTerm.toLowerCase().split(" ").filter(Boolean);

	// If no valid search terms, return empty results
	if (searchTerms.length === 0) {
		return {
			products: [],
			total: 0,
			hasMore: false,
		};
	}

	// Build the GROQ query
	const query = `*[_type == "products" && (
            // Exact matches in name
            name match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||

            // Matches in description
            description match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||

            // Matches in categories (any category name match)
            count(categories[name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]) > 0 ||

            // Matches in clothe types (any clothe type name match)
            count(clotheTypes[name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]) > 0 ||

            // Match by color
            ${searchTerms.map((term) => `"${term}" in color`).join(" || ")}
        )] | order(
            isNew desc,
            _createdAt desc
        ) [${offset}...${offset + limit}] {
            _id,
            name,
            "slug": slug.current,
            "categories": categories[]->name,
            "clotheTypes": clotheTypes[]->name,
            price,
            discountedPrice,
            onSale,
            isNew,
            inStock,
            color,
            "imageUrls": images[].asset->url,
            "lqips": images[].asset->metadata.lqip,
            _createdAt
        }`;

	// Count query for pagination
	const countQuery = `count(*[_type == "products" && (
        name match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
        description match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
        // Matches in categories (any category name match)
        count(categories[name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]) > 0 ||
        // Matches in clothe types (any clothe type name match)
        count(clotheTypes[name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]) > 0 ||
        // Match by color
        ${searchTerms.map((term) => `"${term}" in color`).join(" || ")}
    )])`;

	try {
		const [products, total] = await Promise.all([
			client.fetch<IProduct[]>(query),
			client.fetch<number>(countQuery),
		]);

		return {
			products,
			total,
			hasMore: total > offset + limit,
		};
	} catch (error) {
		console.error("Search query error:", error);
		throw new Error("Failed to search products");
	}
}

// Example usage in an API route
// export async function GET(request: Request) {
// 	const { searchParams } = new URL(request.url);
// 	const query = searchParams.get("q") || "";
// 	const page = parseInt(searchParams.get("page") || "1");
// 	const limit = 12;
// 	const offset = (page - 1) * limit;

// 	try {
// 		const results = await searchProducts({
// 			searchTerm: query,
// 			limit,
// 			offset,
// 		});

// 		return new Response(JSON.stringify(results), {
// 			headers: { "Content-Type": "application/json" },
// 		});
// 	} catch (error) {
// 		return new Response(
// 			JSON.stringify({ error: "Failed to search products" }),
// 			{
// 				status: 500,
// 				headers: { "Content-Type": "application/json" },
// 			}
// 		);
// 	}
// }
