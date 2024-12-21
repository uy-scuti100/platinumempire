"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import {
	Drawer,
	DrawerContent,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { useFetchTypes } from "@/hooks/queries";
export interface FilterOption {
	label: string;
	value: string;
	count?: number;
}

export interface CategoryOption extends FilterOption {
	count: number;
}

export interface SizeOption extends FilterOption {
	count: number;
}

export interface FilterState {
	isNew: boolean;
	inStock: boolean;
	onSale: boolean;
	gender: string;
	categories: string[];
	clotheTypes: string[];
	accessorySizes: string[];

	clotheSizes: string[];
	shoeSizes: string[];
	bagSizes: string[];
	sortBy: string;
	priceRange?: [number, number];
}

export function ProductFilter() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const {
		accessorySize,
		clotheTypes,
		categories,
		shoeSizes,
		bagSizes,
		clotheSizes,
	} = useFetchTypes();

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const parseFiltersFromURL = () => {
		const filters: FilterState = {
			isNew: searchParams.get("isNew") === "true",
			inStock: searchParams.get("inStock") === "true",
			onSale: searchParams.get("onSale") === "true",
			gender: searchParams.get("gender") || "",
			categories: searchParams.get("categories")?.split(",") || [],
			clotheTypes: searchParams.get("clotheTypes")?.split(",") || [],
			accessorySizes: searchParams.get("accessorySizes")?.split(",") || [],
			clotheSizes: searchParams.get("clotheSizes")?.split(",") || [],
			shoeSizes: searchParams.get("shoeSizes")?.split(",") || [],
			bagSizes: searchParams.get("bagSizes")?.split(",") || [],
			sortBy: searchParams.get("sortBy") || "",
			priceRange: searchParams.get("priceRange")
				? (searchParams
						.get("priceRange")
						?.split(",")
						.map((value) => parseInt(value, 10)) as [number, number])
				: undefined,
		};
		return filters;
	};

	const [filters, setFilters] = useState<FilterState>(parseFiltersFromURL());

	const updateURL = useCallback(
		(newFilters: FilterState) => {
			const params = new URLSearchParams();
			if (newFilters.isNew) params.set("isNew", "true");
			if (newFilters.inStock) params.set("inStock", "true");
			if (newFilters.onSale) params.set("onSale", "true");
			if (newFilters.gender) params.set("gender", newFilters.gender);
			if (newFilters.categories.length) {
				params.set("categories", newFilters.categories.join(","));
			}
			if (newFilters.gender) {
				params.set("gender", newFilters.gender);
			}
			if (newFilters.clotheTypes.length) {
				params.set("clotheTypes", newFilters.clotheTypes.join(","));
			}
			if (newFilters.accessorySizes.length) {
				params.set("accessorySize", newFilters.accessorySizes.join(","));
			}
			if (newFilters.clotheSizes.length) {
				params.set("clotheSizes", newFilters.clotheSizes.join(","));
			}
			if (newFilters.shoeSizes.length) {
				params.set("shoeSizes", newFilters.shoeSizes.join(","));
			}
			if (newFilters.bagSizes.length) {
				params.set("bagSizes", newFilters.bagSizes.join(","));
			}

			// Handle sort key properly
			if (newFilters.sortBy) {
				const [key, value] = newFilters.sortBy.split("="); // Split "price=asc" into ["price", "asc"]
				params.set(key, value);
			}

			if (
				newFilters.priceRange &&
				(newFilters.priceRange[0] !== 0 || newFilters.priceRange[1] !== 10000)
			) {
				params.set("priceRange", newFilters.priceRange.join(","));
			}

			// Update the URL
			router.push(`?${params.toString()}`);
		},
		[router]
	);

	const handleApplyFilters = () => {
		updateURL(filters);
		if (isFilterOpen) setIsFilterOpen((prev) => !prev);
	};
	const handleFilterChange = (newFilters: FilterState) => {
		setFilters(newFilters);
	};

	const emptyState: FilterState = {
		isNew: false,
		inStock: false,
		onSale: false,
		gender: "",
		categories: [],
		clotheTypes: [],
		accessorySizes: [],
		clotheSizes: [],
		shoeSizes: [],
		bagSizes: [],
		sortBy: "",
		priceRange: undefined,
	};
	const handleClearFilters = () => {
		setFilters(emptyState);
		updateURL(emptyState);
		setIsFilterOpen(false);
	};

	const MobileDrawer = (
		<Drawer open={isFilterOpen} onOpenChange={setIsFilterOpen}>
			<DrawerTrigger asChild>
				<Button
					variant={"ghost"}
					className="flex hover:bg-transparent gap-1 px-0 text-xs font-light items-center"
					onClick={() => setIsFilterOpen((prev) => !prev)}
				>
					<SlidersHorizontal className="w-4" fill="#000" />
					<span>Filter </span>
				</Button>
			</DrawerTrigger>
			<DrawerTitle className="sr-only">Filter</DrawerTitle>
			<DrawerContent className="px-4">
				<ProductContent
					isOpen={isFilterOpen}
					onCloseAction={() => setIsFilterOpen(false)}
					filters={filters}
					onFilterChangeAction={handleFilterChange}
					onClearFiltersAction={handleClearFilters}
					onApplyFiltersAction={handleApplyFilters}
					categories={categories}
					clotheTypes={clotheTypes}
					accessorySize={accessorySize}
					shoeSizes={shoeSizes}
					bagSizes={bagSizes}
					gender={filters.gender}
					clotheSizes={clotheSizes}
				/>
			</DrawerContent>
		</Drawer>
	);

	const DesktopSheet = (
		<Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
			<SheetTrigger asChild>
				<Button
					variant={"ghost"}
					className="flex hover:bg-transparent gap-1 px-0 text-xs font-light items-center"
					onClick={() => setIsFilterOpen((prev) => !prev)}
				>
					<SlidersHorizontal size={20} fill="#000" />
					<span>Filter </span>
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetTitle className="sr-only">Filter</SheetTitle>

				<ProductContent
					isOpen={isFilterOpen}
					onCloseAction={() => setIsFilterOpen(false)}
					filters={filters}
					onFilterChangeAction={handleFilterChange}
					onClearFiltersAction={handleClearFilters}
					onApplyFiltersAction={handleApplyFilters}
					categories={categories}
					clotheTypes={clotheTypes}
					accessorySize={accessorySize}
					shoeSizes={shoeSizes}
					bagSizes={bagSizes}
					clotheSizes={clotheSizes}
					gender={filters.gender}
				/>
				<div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto">
					<div className="flex gap-2 max-w-md mx-auto">
						<Button
							variant="outline"
							className="flex-1 rounded-none text-base py-7 font-light border-zinc-800 tracking-wide "
							onClick={handleClearFilters}
						>
							Clear All
						</Button>
						<Button
							className="flex-1 py-7 rounded-none text-base tracking-wide font-light"
							onClick={handleApplyFilters}
						>
							Apply Filters
						</Button>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);

	return isMobile ? MobileDrawer : DesktopSheet;
}
interface FilterProps {
	isOpen: boolean;
	onCloseAction: () => void;
	bagSizes: string[];
	shoeSizes: string[];
	clotheSizes: string[];
	clotheTypes: string[];
	gender: string;
	accessorySize: string[];
	categories: string[];
	filters: FilterState;
	onFilterChangeAction: (filters: FilterState) => void;
	onApplyFiltersAction: () => void;
	onClearFiltersAction: () => void;
}

const ProductContent = ({
	filters,
	onFilterChangeAction,
	onClearFiltersAction,
	onApplyFiltersAction,
	categories,
	clotheTypes,
	accessorySize,
	shoeSizes,
	bagSizes,
	clotheSizes,
}: FilterProps) => {
	const [localFilters, setLocalFilters] = useState(filters);

	const handleFilterChange = (newFilters: FilterState) => {
		setLocalFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
		onFilterChangeAction({ ...localFilters, ...newFilters });
	};

	const sortOptions = [
		{ name: "Newest", value: "date=desc" },
		{ name: "Oldest", value: "date=asc" },
		{ name: "Price, low to high", value: "price=asc" },
		{ name: "Price, high to low", value: "price=desc" },
	];

	const selectedCategory = localFilters.categories[0];
	const showClotheOptions = selectedCategory === "wears";
	const showBagOptions = selectedCategory === "bags";
	const showAccessoryOptions = selectedCategory === "accessories";
	const showShoeOptions = selectedCategory === "shoes";

	return (
		<>
			<div className="flex flex-col gap-4 pt-4">
				<ScrollArea className="h-[calc(100vh-9rem)] pr-4">
					<div className="space-y-6">
						<div className="space-y-4 border-b pb-3">
							<h4 className="font-medium">Sort By</h4>
							<RadioGroup
								defaultValue={sortOptions[0].value}
								value={localFilters.sortBy}
								onValueChange={(value) =>
									handleFilterChange({ ...localFilters, sortBy: value })
								}
							>
								{sortOptions.map((option) => (
									<div
										className="flex items-center space-x-2"
										key={option.value}
									>
										<RadioGroupItem value={option.value} id={option.value} />
										<Label htmlFor={option.value}>{option.name}</Label>
									</div>
								))}
							</RadioGroup>
						</div>
						<div className="space-y-4 border-b pb-3">
							<h4 className="font-medium">Gender</h4>
							<div className="flex  flex-col space-y-2">
								{["men", "women", "unisex"].map((gender) => (
									<div key={gender} className="flex items-center space-x-2">
										<Checkbox
											id={gender}
											checked={localFilters.gender === gender}
											onCheckedChange={(checked) =>
												handleFilterChange({
													...localFilters,
													gender: checked ? gender : "",
												})
											}
										/>
										<Label htmlFor={gender}>{gender}</Label>
									</div>
								))}
							</div>
						</div>

						<div className="space-y-4 border-b pb-3">
							<h4 className="font-medium">Status</h4>
							<div className="space-y-2">
								<div className="flex items-center space-x-2">
									<Checkbox
										id="isNew"
										checked={localFilters.isNew}
										onCheckedChange={(checked) =>
											handleFilterChange({
												...localFilters,
												isNew: checked as boolean,
											})
										}
									/>
									<Label htmlFor="isNew">New Arrivals</Label>
								</div>
								<div className="flex items-center space-x-2">
									<Checkbox
										id="onSale"
										checked={localFilters.onSale}
										onCheckedChange={(checked) =>
											handleFilterChange({
												...localFilters,
												onSale: checked as boolean,
											})
										}
									/>
									<Label htmlFor="onSale">On Sale</Label>
								</div>
							</div>
						</div>

						<Accordion type="multiple" className="w-full">
							<AccordionItem value="category">
								<AccordionTrigger>Category</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-4">
										<RadioGroup
											value={localFilters.categories[0]} //
											onValueChange={(value) =>
												handleFilterChange({
													...localFilters,
													categories: [value],
												})
											}
										>
											{categories.map((category) => (
												<div
													className="flex items-center space-x-2"
													key={category}
												>
													<RadioGroupItem value={category} id={category} />
													<Label htmlFor={category}>{category}</Label>
												</div>
											))}
										</RadioGroup>
									</div>
								</AccordionContent>
							</AccordionItem>

							<AccordionItem value="price">
								<AccordionTrigger>Price</AccordionTrigger>
								<AccordionContent>
									<div className="space-y-4">
										<div className="flex items-center flex-col  p-2">
											<Slider
												min={1000}
												max={100000}
												step={10}
												value={localFilters.priceRange}
												onValueChange={(value: [number, number]) =>
													handleFilterChange({
														...localFilters,
														priceRange: value,
													})
												}
											/>
											<div className="flex justify-between items-center w-full">
												<span>
													{formatCurrency(
														Math.min(
															localFilters.priceRange?.[0] ?? 0,
															localFilters.priceRange?.[1] ?? 0
														)
													)}
												</span>
												<span>
													{formatCurrency(
														Math.max(
															localFilters.priceRange?.[0] ?? 0,
															localFilters.priceRange?.[1] ?? 0
														)
													)}
												</span>{" "}
											</div>
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
							{showClotheOptions && (
								<>
									<AccordionItem value="clotheType">
										<AccordionTrigger>Clothe Type</AccordionTrigger>
										<AccordionContent>
											<div className="space-y-4">
												{clotheTypes.map((type) => (
													<div
														key={type}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={type}
															checked={localFilters.clotheTypes.includes(type)}
															onCheckedChange={(checked) => {
																handleFilterChange({
																	...localFilters,
																	clotheTypes: checked
																		? [...localFilters.clotheTypes, type]
																		: localFilters.clotheTypes.filter(
																				(t) => t !== type
																			),
																});
															}}
														/>
														<Label htmlFor={type}>{type}</Label>
													</div>
												))}
											</div>
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="clotheSize">
										<AccordionTrigger>Clothe Size</AccordionTrigger>
										<AccordionContent>
											<div className="grid grid-cols-3 gap-2">
												{clotheSizes.map((size) => (
													<Button
														key={size}
														variant={
															localFilters.clotheSizes.includes(size)
																? "default"
																: "outline"
														}
														className="w-full rounded-full"
														onClick={() => {
															handleFilterChange({
																...localFilters,
																clotheSizes: localFilters.clotheSizes.includes(
																	size
																)
																	? localFilters.clotheSizes.filter(
																			(s: string) => s !== size
																		)
																	: [...localFilters.clotheSizes, size],
															});
														}}
													>
														{size}
													</Button>
												))}
											</div>
										</AccordionContent>
									</AccordionItem>
								</>
							)}
							{showShoeOptions && (
								<AccordionItem value="shoeSize">
									<AccordionTrigger>Shoe Size</AccordionTrigger>
									<AccordionContent>
										<div className="grid grid-cols-3 gap-2">
											{shoeSizes.map((size) => (
												<Button
													key={size}
													variant={
														localFilters.bagSizes.includes(size)
															? "default"
															: "outline"
													}
													className="w-full rounded-full"
													onClick={() => {
														handleFilterChange({
															...localFilters,
															bagSizes: localFilters.bagSizes.includes(size)
																? localFilters.bagSizes.filter(
																		(s: string) => s !== size
																	)
																: [...localFilters.bagSizes, size],
														});
													}}
												>
													{size}
												</Button>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							)}
							{showBagOptions && (
								<AccordionItem value="bagSize">
									<AccordionTrigger>Bag Size</AccordionTrigger>
									<AccordionContent>
										<div className="grid grid-cols-3 gap-2">
											{bagSizes.map((size) => (
												<Button
													key={size}
													variant={
														localFilters.bagSizes.includes(size)
															? "default"
															: "outline"
													}
													className="w-full rounded-full"
													onClick={() => {
														handleFilterChange({
															...localFilters,
															bagSizes: localFilters.bagSizes.includes(size)
																? localFilters.bagSizes.filter(
																		(s: string) => s !== size
																	)
																: [...localFilters.bagSizes, size],
														});
													}}
												>
													{size}
												</Button>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							)}
							{showAccessoryOptions && (
								<AccordionItem value="accessorySize">
									<AccordionTrigger>Accessory Size</AccordionTrigger>
									<AccordionContent>
										<div className="grid grid-cols-3 gap-2">
											{accessorySize.map((size) => (
												<Button
													key={size}
													variant={
														localFilters.accessorySizes.includes(size)
															? "default"
															: "outline"
													}
													className="w-full rounded-full"
													onClick={() => {
														handleFilterChange({
															...localFilters,
															accessorySizes:
																localFilters.accessorySizes.includes(size)
																	? localFilters.accessorySizes.filter(
																			(s: string) => s !== size
																		)
																	: [...localFilters.accessorySizes, size],
														});
													}}
												>
													{size}
												</Button>
											))}
										</div>
									</AccordionContent>
								</AccordionItem>
							)}
						</Accordion>
					</div>
				</ScrollArea>
			</div>

			<div className="p-4 bg-zinc-100 border-t border-zinc-200 mt-auto md:hidden">
				<div className="flex gap-2 max-w-md mx-auto">
					<Button
						variant="outline"
						className="flex-1 rounded-none text-base py-5 font-light border-zinc-800 tracking-wide "
						onClick={onClearFiltersAction}
					>
						Clear All
					</Button>
					<Button
						className="flex-1 py-5 rounded-none text-base tracking-wide font-light"
						onClick={onApplyFiltersAction}
					>
						Apply Filters
					</Button>
				</div>
			</div>
		</>
	);
};
const formatCurrency = (value: number) =>
	new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
	}).format(value);
