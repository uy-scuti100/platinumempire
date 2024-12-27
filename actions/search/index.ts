"use server";

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

	// Count query for pagination
	const countQuery = `count(*[_type == "products" && (
    name match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
    description match "${searchTerms.map((term) => `*${term}*`).join(" ")}" ||
    // Matches in categories (reference)
    count(categories[]->) > 0 && references(*[_type == "category" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id) ||
    // Matches in clothe types (reference)
    count(clotheTypes[]->) > 0 && references(*[_type == "clotheType" && name match "${searchTerms.map((term) => `*${term}*`).join(" ")}"]._id) ||
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
