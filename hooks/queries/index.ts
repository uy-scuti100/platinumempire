"use client";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { useEffect, useState } from "react";

export function useFetchTypes() {
	const [clotheTypes, setClotheTypes] = useState<string[]>([]);
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
					bagSizesResult,
					accessorySizeResult,
				] = await Promise.all([
					client.fetch<any[]>(groq`*[_type == "category"].name`),
					client.fetch<any[]>(groq`*[_type == "clotheSize"].name`),
					client.fetch<any[]>(groq`*[_type == "clotheType"].name`),
					client.fetch<any[]>(groq`*[_type == "bagSize"].name`),
					client.fetch<any[]>(groq`*[_type == "accessorySize"].name`),
				]);

				// Set the results into their respective states
				setAccessorySize(accessorySizeResult);
				setClotheTypes(clotheTypesResult);
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

		bagSizes,
		clotheSizes,
	};
}
