"use client";
import { useEffect, useState } from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export function useFetchTypes() {
	const [clotheTypes, setClotheTypes] = useState<string[]>([]);
	const [shoeSizes, setShoeSizes] = useState<string[]>([]);
	const [bagSizes, setBagSizes] = useState<string[]>([]);
	const [accessorySize, setAccessorySize] = useState<string[]>([]);
	const [clotheSizes, setClotheSizes] = useState<string[]>([]);
	const [categories, setCategories] = useState<string[]>([]);

	useEffect(() => {
		const fetchTypes = async () => {
			try {
				// Use Promise.all to parallelize all fetch calls
				const [
					categoriesResult,
					ClotheSizesResult,
					clotheTypesResult,
					shoeSizesResult,
					bagSizesResult,
					accessorySizeResult,
				] = await Promise.all([
					client.fetch<any[]>(groq`*[_type == "category"].name`),
					client.fetch<any[]>(groq`*[_type == "clotheSize"].name`),
					client.fetch<any[]>(groq`*[_type == "clotheType"].name`),
					client.fetch<any[]>(groq`*[_type == "shoeSize"].name`),
					client.fetch<any[]>(groq`*[_type == "bagSize"].name`),
					client.fetch<any[]>(groq`*[_type == "accessorySize"].name`),
				]);

				// Set the results into their respective states
				setAccessorySize(accessorySizeResult);
				setClotheTypes(clotheTypesResult);
				setShoeSizes(shoeSizesResult);
				setBagSizes(bagSizesResult);
				setClotheSizes(ClotheSizesResult);
				setCategories(categoriesResult);
			} catch (error) {
				console.error("Error fetching types:", error);
			}
		};

		fetchTypes();
	}, []); // Dependency array left empty to avoid unnecessary re-fetching

	return {
		accessorySize,
		clotheTypes,
		categories,
		shoeSizes,
		bagSizes,
		clotheSizes,
	};
}
