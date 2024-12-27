"use client";
import { IProduct } from "@/actions/products";
import { searchProducts } from "@/actions/search";
import ProductCard from "@/components/globalcomponents/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebouncedSearch from "@/hooks/search";
import { useStore } from "@/lib/store/cart";
import { useInfiniteQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function SearchDialog() {
	const { searchTerm, debouncedTerm, setSearchTerm } = useDebouncedSearch(500);
	const [isSearchLoading, setIsSearchLoading] = useState(false);

	const handleSearchChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(e.target.value);
		},
		[setSearchTerm]
	);

	// Memoize the debouncedTerm query to avoid unnecessary re-fetching
	const queryKey = useMemo(() => ["search", debouncedTerm], [debouncedTerm]);

	// React Query Infinite Query
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		error,
	} = useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			searchProducts({
				searchTerm: debouncedTerm,
				limit: 12,
				offset: (pageParam - 1) * 12,
			}),
		getNextPageParam: (lastPage, pages) =>
			lastPage.hasMore ? pages.length + 1 : undefined,
		enabled: debouncedTerm.length > 0,
		initialPageParam: 1,
	});

	useEffect(() => {
		if (isLoading || debouncedTerm.length < 0) {
			setIsSearchLoading(true);
		} else {
			setIsSearchLoading(false);
		}
	}, [isLoading, error]);

	// Infinite Scroll Listener
	const scrollRef = useRef<HTMLDivElement | null>(null);
	const openSearch = useStore((state) => state.isSearchOpen);

	useEffect(() => {
		const handleScroll = () => {
			if (
				scrollRef.current &&
				scrollRef.current.scrollTop + scrollRef.current.clientHeight >=
					scrollRef.current.scrollHeight - 100
			) {
				if (hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			}
		};

		const refCurrent = scrollRef.current;
		refCurrent?.addEventListener("scroll", handleScroll);
		return () => refCurrent?.removeEventListener("scroll", handleScroll);
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	// Calculate total matches from the first page
	const searchCounts = data?.pages[0]?.counts;
	const totalResults = data?.pages[0]?.total || 0;

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div
			className={`${
				openSearch ? "fixed" : "hidden"
			} top-0 left-0 w-full h-full z-[999999999] gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500`}
		>
			<div className="w-full h-full overflow-hidden absolute inset-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none p-4">
				<div className="flex items-center justify-between w-full py-2">
					<div className="flex items-center gap-2">
						<Search className="h-5 w-5 shrink-0" />
						<Input
							onChange={handleSearchChange}
							className="h-12 border-none pl-0 text-lg font-semibold focus-visible:ring-0 focus-visible:ring-offset-0"
							autoFocus
							value={searchTerm}
							placeholder="What are you looking for..."
						/>
					</div>

					<Button
						variant="ghost"
						size="icon"
						onClick={() => useStore.getState().closeSearch()}
					>
						<X className="h-5 w-5" />
					</Button>
				</div>

				{/* Search Summary */}
				{searchTerm && !isSearchLoading && searchCounts && (
					<div className="mt-2 text-sm flex flex-col items-center justify-center w-full">
						<p className="text-center text-muted-foreground">
							Found a total of{" "}
							<span className="font-semibold text-black">{totalResults}</span>{" "}
							results for "
							<span className="font-semibold text-black">{searchTerm}</span>"
						</p>

						{/* <div className="flex flex-wrap justify-center w-full gap-2 mt-1">
							{searchCounts.nameMatches > 0 && (
								<span>
									Matches {searchCounts.nameMatches} results in product names
								</span>
							)}
							{searchCounts.categoryMatches > 0 && (
								<span>
									Matches {searchCounts.categoryMatches} results in categories
								</span>
							)}
							{searchCounts.clotheTypeMatches > 0 && (
								<span>
									Matches {searchCounts.clotheTypeMatches} results in clothing
									types
								</span>
							)}
							{searchCounts.colorMatches > 0 && (
								<span>
									Matches {searchCounts.colorMatches} results in colors
								</span>
							)}
							{searchCounts.descriptionMatches > 0 && (
								<span>
									Matches {searchCounts.descriptionMatches} results in
									descriptions
								</span>
							)}
						</div> */}
					</div>
				)}

				{/* Search Results */}
				<div
					ref={scrollRef}
					className="relative mt-4 overflow-y-auto bg-white rounded-sm"
					style={{ height: "calc(90vh - 80px)" }}
					scroll-behavior="smooth"
				>
					{isSearchLoading ? (
						<div className="flex justify-center items-center h-full">
							<LoadingDots className="bg-white" />
						</div>
					) : (
						<div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-5 p-4">
							{data?.pages.map((page) =>
								page.products.map((product: IProduct, index: number) => (
									<AnimatePresence key={product._id} mode="wait">
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											whileInView={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											viewport={{ once: true }}
											onClick={() => useStore.getState().closeSearch()}
										>
											<ProductCard key={product._id} product={product} />
										</motion.div>
									</AnimatePresence>
								))
							)}
						</div>
					)}
					{isFetchingNextPage && <div>Loading more...</div>}
					{data?.pages.length !== 0 && !hasNextPage && totalResults > 0 && (
						<div className="text-center mt-20 text-muted-foreground">
							All{" "}
							<span className="font-semibold text-black">{totalResults}</span>{" "}
							results have been displayed.
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

import clsx from "clsx";

const dots =
	"mx-[1px] inline-block h-3 w-3 animate-blink rounded-full bg-black";

const LoadingDots = ({ className }: { className: string }) => {
	return (
		<span className="mx-2 inline-flex items-center">
			<span className={clsx(dots, className)} />
			<span className={clsx(dots, "animation-delay-[200ms]", className)} />
			<span className={clsx(dots, "animation-delay-[400ms]", className)} />
		</span>
	);
};
