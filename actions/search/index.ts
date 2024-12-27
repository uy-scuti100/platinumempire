"use server";

import { client } from "@/sanity/lib/client";
import { IProduct } from "../products";

interface SearchParams {
	searchTerm: string;
	limit?: number;
	offset?: number;
}

interface SearchCounts {
	nameMatches: number;
	descriptionMatches: number;
	categoryMatches: number;
	clotheTypeMatches: number;
	colorMatches: number;
}

interface SearchResponse {
	products: IProduct[];
	total: number;
	hasMore: boolean;
	counts: SearchCounts;
}

export async function searchProducts({
	searchTerm,
	limit = 12,
	offset = 0,
}: SearchParams): Promise<SearchResponse> {
	// Split and filter the search term
	const searchTerms = searchTerm.toLowerCase().split(" ").filter(Boolean);

	// If no valid search terms, return empty results
	if (searchTerms.length === 0) {
		return {
			products: [],
			total: 0,
			hasMore: false,
			counts: {
				nameMatches: 0,
				descriptionMatches: 0,
				categoryMatches: 0,
				clotheTypeMatches: 0,
				colorMatches: 0,
			},
		};
	}

	// Individual count queries for each type
	const nameCountQuery = `count(*[_type == "products" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"])`;

	const descriptionCountQuery = `count(*[_type == "products" && description match "${searchTerms.map((term) => `*${term}*`).join(" ")}"])`;

	const categoryCountQuery = `count(*[_type == "products" && count(categories[]->) > 0 && references(*[_type == "category" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id)])`;

	const clotheTypeCountQuery = `count(*[_type == "products" && count(clotheTypes[]->) > 0 && references(*[_type == "clotheType" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id)])`;

	const colorCountQuery = `count(*[_type == "products" && ${searchTerms.map((term) => `"${term}" in color`).join(" || ")}])`;

	// Main search query
	const query = `*[_type == "products" && (
    // Exact matches in name
    name match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
    
    // Matches in description
    description match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
    
    // Matches in categories (reference)
    count(categories[]->) > 0 && references(*[_type == "category" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id) ||
    
    // Matches in clothe types (reference)
    count(clotheTypes[]->) > 0 && references(*[_type == "clotheType" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id) ||
    
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

	// Total count query
	const totalCountQuery = `count(*[_type == "products" && (
    name match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
    description match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
    count(categories[]->) > 0 && references(*[_type == "category" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id) ||
    count(clotheTypes[]->) > 0 && references(*[_type == "clotheType" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id) ||
    ${searchTerms.map((term) => `"${term}" in color`).join(" || ")}
  )])`;

	try {
		const [
			products,
			total,
			nameMatches,
			descriptionMatches,
			categoryMatches,
			clotheTypeMatches,
			colorMatches,
		] = await Promise.all([
			client.fetch<IProduct[]>(query),
			client.fetch<number>(totalCountQuery),
			client.fetch<number>(nameCountQuery),
			client.fetch<number>(descriptionCountQuery),
			client.fetch<number>(categoryCountQuery),
			client.fetch<number>(clotheTypeCountQuery),
			client.fetch<number>(colorCountQuery),
		]);

		return {
			products,
			total,
			hasMore: total > offset + limit,
			counts: {
				nameMatches,
				descriptionMatches,
				categoryMatches,
				clotheTypeMatches,
				colorMatches,
			},
		};
	} catch (error) {
		console.error("Search query error:", error);
		throw new Error("Failed to search products");
	}
}
