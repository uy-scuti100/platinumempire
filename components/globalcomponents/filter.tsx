// "use client";

// import { Label } from "@/components/ui/label";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { usePathname } from "next/navigation";
// import { groq } from "next-sanity";
// import { useEffect, useState, useMemo } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// import {
// 	Accordion,
// 	AccordionContent,
// 	AccordionItem,
// 	AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Checkbox } from "@/components/ui/checkbox";
// import { client } from "@/sanity/lib/client";

// const MemoizedFilter = () => {
// 	const pathname = usePathname();
// 	const router = useRouter();
// 	const searchparams = useSearchParams();

// 	const [accessoryTypes, setAccessoryTypes] = useState<any[]>([]);
// 	const [bagTypes, setBagTypes] = useState<any[]>([]);
// 	const [clotheTypes, setClotheTypes] = useState<any[]>([]);
// 	const [shoeTypes, setShoeTypes] = useState<any[]>([]);
// 	const [colors, setColors] = useState<any[]>([{ name: "", value: "" }]);
// 	const [shoeSizes, setShoeSizes] = useState<any[]>([]);
// 	const [bagSizes, setBagSizes] = useState<any[]>([]);
// 	const [clotheSizes, setClotheSizes] = useState<any[]>([]);
// 	const [currentCategory, setCurrentCategory] = useState("");

// 	const categories = [
// 		{ value: "Clothings", label: "Clothing" },
// 		{ value: "Shoes", label: "Shoes" },
// 		{ value: "Bags", label: "Bags" },
// 		{ value: "Accessories", label: "Accessories" },
// 	];

// 	useEffect(() => {
// 		const fetchTypes = async () => {
// 			try {
// 				// Fetch accessory types
// 				const accessoryTypesResult = await client.fetch<any[]>(
// 					groq`*[_type == "accessoryType"].name`
// 				);
// 				setAccessoryTypes(accessoryTypesResult);

// 				// Fetch bag types
// 				const bagTypesResult = await client.fetch<any[]>(
// 					groq`*[_type == "bagType"].name`
// 				);
// 				setBagTypes(bagTypesResult);

// 				// Fetch clothe types
// 				const clotheTypesResult = await client.fetch<any[]>(
// 					groq`*[_type == "clotheType"].name`
// 				);
// 				setClotheTypes(clotheTypesResult);

// 				// Fetch shoe types
// 				const shoeSizeResult = await client.fetch<any[]>(
// 					groq`*[_type == "shoeSize"].name`
// 				);
// 				setShoeSizes(shoeSizeResult);
// 				const bagSizeResult = await client.fetch<any[]>(
// 					groq`*[_type == "bagSize"].name`
// 				);
// 				setBagSizes(bagSizeResult);
// 				const clotheSizeResult = await client.fetch<any[]>(
// 					groq`*[_type == "clotheSize"].name`
// 				);
// 				setClotheSizes(clotheSizeResult);
// 				const colorsResult = await client.fetch<any[]>(
// 					groq`*[_type == "color"]{
//                   name,
//                   value
//                }`
// 				);
// 				setColors(colorsResult);
// 				const shoeTypesResult = await client.fetch<any[]>(
// 					groq`*[_type == "shoeType"].name`
// 				);
// 				setShoeTypes(shoeTypesResult);
// 			} catch (error) {
// 				console.error("Error fetching types:", error);
// 			}
// 		};

// 		fetchTypes();
// 	}, [
// 		bagTypes,
// 		accessoryTypes,
// 		clotheTypes,
// 		shoeTypes,
// 		shoeSizes,
// 		bagSizes,
// 		clotheSizes,
// 	]);

// 	return useMemo(
// 		() => (
// 			<div className="w-full md:block hidden sticky top-56">
// 				<div className="flex flex-col gap-5 overflow-y-auto min-h-screen">
// 					{/* Categories */}
// 					<Accordion type="single" collapsible>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Categories
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<RadioGroup defaultValue={currentCategory}>
// 									{categories?.map((cat, i) => (
// 										<div
// 											key={cat.value}
// 											className="flex items-center space-x-2"
// 										>
// 											<RadioGroupItem
// 												value={cat.value}
// 												id={cat.value}
// 												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 													const params = new URLSearchParams(searchparams);
// 													const checked =
// 														(e.currentTarget as HTMLButtonElement).getAttribute(
// 															"data-state"
// 														) === "checked";
// 													checked
// 														? params.delete("category")
// 														: params.set("categories", cat.value);
// 													router.replace(`${pathname}?${params.toString()}`);

// 													setCurrentCategory(cat.value);
// 												}}
// 											/>
// 											<Label htmlFor={cat.value}>{cat.label}</Label>
// 										</div>
// 									))}
// 								</RadioGroup>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>

// 					{/* Colors */}
// 					<Accordion type="single" collapsible>
// 						<AccordionItem value="colors">
// 							<AccordionTrigger>
// 								<span>
// 									Colors
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4 overflow-auto h-[200px]">
// 									{colors && colors.length > 0 ? (
// 										colors?.map((color, i) => (
// 											<div
// 												key={color.value}
// 												className="flex items-center space-x-2"
// 											>
// 												<Checkbox id={`col-${i}`} />
// 												<label
// 													htmlFor={`col-${i}`}
// 													className=" flex items-center px-4 justify-between w-full text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 												>
// 													<div>{color.name}</div>
// 													<div
// 														style={{
// 															background: `${color.value}`,
// 														}}
// 														className="rounded-none-full h-8 w-8 border"
// 													></div>
// 												</label>
// 											</div>
// 										))
// 									) : (
// 										<div className="flex items-center justify-center h-20 animate-pulse">
// 											Loading...
// 										</div>
// 									)}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 					{/* Accessory Types */}
// 					<Accordion
// 						type="single"
// 						collapsible
// 						className={`${
// 							currentCategory === "accessories" ? "block" : "hidden"
// 						}`}
// 					>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Accessory Types
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4">
// 									{accessoryTypes.map((type, i) => (
// 										<div key={i} className="flex items-center space-x-2">
// 											<Checkbox id={`accessorytype-${i}`} />
// 											<label
// 												htmlFor={`accessorytype-${i}`}
// 												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 											>
// 												{type}
// 											</label>
// 										</div>
// 									))}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 					{/* Shoe Types */}
// 					<Accordion
// 						type="single"
// 						collapsible
// 						className={`${currentCategory === "shoes" ? "block" : "hidden"}`}
// 					>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Shoe Types
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4">
// 									{shoeTypes.map((type, i) => (
// 										<div key={i} className="flex items-center space-x-2">
// 											<Checkbox
// 												id={`shoetype-${i}`}
// 												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 													const params = new URLSearchParams(searchparams);
// 													const checked =
// 														(e.currentTarget as HTMLButtonElement).getAttribute(
// 															"data-state"
// 														) === "checked";
// 													checked
// 														? params.delete("shoeType")
// 														: params.set("shoeType", type);
// 													router.replace(`${pathname}?${params.toString()}`);
// 												}}
// 											/>
// 											<label
// 												htmlFor={`shoetype-${i}`}
// 												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 											>
// 												{type}
// 											</label>
// 										</div>
// 									))}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 					{/* Clothe Types */}
// 					<Accordion
// 						type="single"
// 						collapsible
// 						className={`${
// 							currentCategory === "clothings" ? "block" : "hidden"
// 						}`}
// 					>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Clothe Types
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4">
// 									{clotheTypes.map((type, i) => (
// 										<div key={i} className="flex items-center space-x-2">
// 											<Checkbox
// 												id={`clothetype-${i}`}
// 												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 													const params = new URLSearchParams(searchparams);
// 													const checked =
// 														(e.currentTarget as HTMLButtonElement).getAttribute(
// 															"data-state"
// 														) === "checked";
// 													checked
// 														? params.delete("clotheType")
// 														: params.set("clotheType", type);
// 													router.replace(`${pathname}?${params.toString()}`);
// 												}}
// 											/>
// 											<label
// 												htmlFor={`clothetype-${i}`}
// 												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 											>
// 												{type}
// 											</label>
// 										</div>
// 									))}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 					{/* Bag Types */}
// 					<Accordion
// 						type="single"
// 						collapsible
// 						className={`${currentCategory === "bags" ? "block" : "hidden"}`}
// 					>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Bag Types
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4">
// 									{bagTypes.map((type, i) => (
// 										<div key={i} className="flex items-center space-x-2">
// 											<Checkbox
// 												id={`bagtype-${i}`}
// 												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 													const params = new URLSearchParams(searchparams);
// 													const checked =
// 														(e.currentTarget as HTMLButtonElement).getAttribute(
// 															"data-state"
// 														) === "checked";
// 													checked
// 														? params.delete("bagType")
// 														: params.set("bagType", type);
// 													router.replace(`${pathname}?${params.toString()}`);
// 												}}
// 											/>
// 											<label
// 												htmlFor={`bagtype-${i}`}
// 												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 											>
// 												{type}
// 											</label>
// 										</div>
// 									))}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 					{/* Shoe Size  */}
// 					<Accordion
// 						type="single"
// 						collapsible
// 						className={`${currentCategory === "shoes" ? "block" : "hidden"}`}
// 					>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Shoe Size
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4">
// 									{shoeSizes.map((size, i) => (
// 										<div key={i} className="flex items-center space-x-2">
// 											<Checkbox
// 												id={`shoesize-${i}`}
// 												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 													const params = new URLSearchParams(searchparams);
// 													const checked =
// 														(e.currentTarget as HTMLButtonElement).getAttribute(
// 															"data-state"
// 														) === "checked";
// 													checked
// 														? params.delete("shoeSize")
// 														: params.set("shoeSize", size);
// 													router.replace(`${pathname}?${params.toString()}`);
// 												}}
// 											/>
// 											<label
// 												htmlFor={`shoesize-${i}`}
// 												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 											>
// 												{size}
// 											</label>
// 										</div>
// 									))}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 					{/* Clothe Size  */}
// 					<Accordion
// 						type="single"
// 						collapsible
// 						className={`${
// 							currentCategory === "clothings" ? "block" : "hidden"
// 						}`}
// 					>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Clothe Size
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4">
// 									{clotheSizes.map((size, i) => (
// 										<div key={i} className="flex items-center space-x-2">
// 											<Checkbox
// 												id={`clothesize-${i}`}
// 												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 													const params = new URLSearchParams(searchparams);
// 													const checked =
// 														(e.currentTarget as HTMLButtonElement).getAttribute(
// 															"data-state"
// 														) === "checked";
// 													checked
// 														? params.delete("clotheSize")
// 														: params.set("clotheSize", size);
// 													router.replace(`${pathname}?${params.toString()}`);
// 												}}
// 											/>
// 											<label
// 												htmlFor={`clothesize-${i}`}
// 												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 											>
// 												{size}
// 											</label>
// 										</div>
// 									))}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 					{/* Bag Size  */}
// 					<Accordion
// 						type="single"
// 						collapsible
// 						className={`${currentCategory === "bags" ? "block" : "hidden"}`}
// 					>
// 						<AccordionItem value="accessoryTypes">
// 							<AccordionTrigger>
// 								<span>
// 									Bag Size
// 									<span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
// 								</span>
// 							</AccordionTrigger>
// 							<AccordionContent>
// 								<div className="space-y-4">
// 									{bagSizes.map((size, i) => (
// 										<div key={i} className="flex items-center space-x-2">
// 											<Checkbox
// 												id={`bagsize-${i}`}
// 												onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
// 													const params = new URLSearchParams(searchparams);
// 													const checked =
// 														e.currentTarget.dataset.state === "checked";
// 													checked
// 														? params.delete("bagSize")
// 														: params.set("bagSize", size);
// 													router.replace(`${pathname}?${params.toString()}`);
// 												}}
// 											/>
// 											<label
// 												htmlFor={`bagsize-${i}`}
// 												className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// 											>
// 												{size}
// 											</label>
// 										</div>
// 									))}
// 								</div>
// 							</AccordionContent>
// 						</AccordionItem>
// 					</Accordion>
// 				</div>
// 			</div>
// 		),
// 		[
// 			bagTypes,
// 			accessoryTypes,
// 			clotheTypes,
// 			shoeTypes,
// 			shoeSizes,
// 			bagSizes,
// 			clotheSizes,
// 		]
// 	);
// };
// export default MemoizedFilter;

// // console.log("Types fetched successfully:", {
// //    accessoryTypes: accessoryTypesResult,
// //    bagTypes: bagTypesResult,
// //    clotheTypes: clotheTypesResult,
// //    shoeTypes: shoeTypesResult,
// //    colors: colorsResult,
// //    shoeSizeResult: shoeSizeResult,
// //    bagSizeResult: bagSizeResult,
// //    clotheSizeResult: clotheSizeResult,
// //    accessorySizeResult: accessorySizeResult,
// // });
