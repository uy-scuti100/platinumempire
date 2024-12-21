"use server";
import { client } from "@/sanity/lib/client";
import { defineQuery } from "next-sanity";
export interface IProduct {
	_id: string;
	name: string;
	slug: string;
	color: string[];
	description: string;
	categories: string[];
	price: number;
	isNew: boolean;
	onSale: boolean;
	inStock: boolean;
	discountedPrice: number;
	_createdAt: string;
	imageUrls: string[];
	lqips: string[];
	clotheTypes?: string[];
	bagSizes?: string[];
	shoeSizes?: string[];
	accessorySizes?: string[];
	clotheSizes?: string[];
}

export async function fetchAllProducts(query: string): Promise<IProduct[]> {
	const ALL_PRODUCTS_QUERY = `
      ${query} {
        _id,
        name,
        "slug": slug.current,
        "categories": categories[]->name,
        "lqips": images[].asset->metadata.lqip,
        price,
        isNew,
        onSale,
        inStock,
        discountedPrice,
        _createdAt,
        "imageUrls": images[].asset->url,
      }
    `;

	try {
		const products = await client.fetch<IProduct[]>(ALL_PRODUCTS_QUERY);
		// console.log("Executed query:", ALL_PRODUCTS_QUERY);
		// console.log("Results:", products);
		return products || [];
	} catch (error) {
		console.error("Error fetching products:", error);
		return [];
	}
}
export const fetchRelatedProducts = async (slug: string, type: string) => {
	const RELATED_PRODUCTS_QUERY =
		defineQuery(`*[_type == "products" && type == "${type}" && slug.current != "${slug}"] {
          name,
          "slug": slug.current, 
          price,
          "imageUrls": images[].asset->url,  
          "lqips": images[].asset->metadata.lqip, 
        }[0...9]`);

	try {
		const products = await client.fetch<IProduct[]>(RELATED_PRODUCTS_QUERY);

		if (!products) {
		}

		return products;
	} catch (error) {
		console.error("Error fetching related products:", error);
	}
};
export const fetchProductBySlug = async (
	slug: string
): Promise<IProduct | undefined> => {
	const PRODUCT_BY_SLUG_QUERY = defineQuery(`
        *[_type == "products" && slug.current == "${slug}"]{
            _id,
            name,
            "slug": slug.current,
            onSale,
            color,
            isNew,
            inStock,
            discountedPrice,
            price,
            description,
            "categories": categories[]->name,
            "bagSizes": bagSizes[]->name,
            "shoeSizes": shoeSizes[]->name,
            "accessorySizes": accessorySizes[]->name,
            "clotheTypes": clotheTypes[]->name,
            "clotheSizes": clotheSizes[]->name,
            "imageUrls": images[].asset->url,
            "lqips": images[].asset->metadata.lqip,
        }
      `);
	try {
		const products = await client.fetch<IProduct[]>(PRODUCT_BY_SLUG_QUERY);
		return products[0];
	} catch (error) {
		console.error("Error fetching product by slug:", error);
		return undefined;
	}
};
export const fetchTwoFromEachCategory = async (categories: string[]) => {
	// Single GROQ query to fetch 2 products per category
	const TWO_FROM_EACH_CATEGORY_QUERY = `
    *[_type == "category" && name in $categories && isNew == true] {
        name,
        "products": *[_type == "products" && references(^._id)]
        | order(_createdAt desc)[0...2] {
            name,
            "slug": slug.current,
            isNew,
            price,
            "imageUrls": images[].asset->url,
            "lqips": images[].asset->metadata.lqip
        }
    }
  `;

	try {
		// Fetch data using the query
		const results = await client.fetch<
			{ name: string; products: IProduct[] }[]
		>(TWO_FROM_EACH_CATEGORY_QUERY, { categories });

		// Flatten the results to combine all products from all categories
		const allProducts = results.flatMap((category) => category.products);

		// Limit the total number of products to 6 (in case there are more)
		const limitedProducts = allProducts.slice(0, 6);

		return limitedProducts || [];
	} catch (error) {
		console.error("Error fetching two from each category products:", error);
		return [];
	}
};

// {
//     _id,
//     name,
//     "slug": slug.current,
//     onSale,
//     color,
//     isNew,
//     inStock,
//     discountedPrice,
//     price,
//     description,
//     "clotheTypes": clotheTypes[]->name,
//     "bagSizes": bagSizes[]->name,
//     "shoeSizes": shoeSizes[]->name,
//     "accessorySizes": accessorySizes[]->name,
//     "clotheSizes": clothesSizes[]->name,
//     "categories": categories[]->name,
//     "imageUrls": images[].asset->url,
//     "lqips": images[].asset->metadata.lqip,
//   }
