"use client";
import { fetchTwoFromEachCategory, IProduct } from "@/actions/products";
import ProductCard from "@/components/globalcomponents/ProductCard";
import { shuffleArray } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
/**
 * Renders a component called "TwoFromEach" that displays a div with the text "TwoFromEach".
 * The component expects an array of `IProduct` objects as a prop called `products`.
 */
export default function TwoFromEach({ categories }: { categories: string[] }) {
	const { data: products } = useQuery({
		queryKey: ["FETCHTWO", categories],
		queryFn: () => fetchTwoFromEachCategory(categories),
	});

	const shuffledProducts = products ? shuffleArray([...products]) : [];

	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<>
			{isClient
				? shuffledProducts &&
					shuffledProducts.length > 0 && (
						<section className="pt-20 px-5">
							<div className="mx-auto">
								<div>
									<div className="text-center md:text-4xl text-2xl font-semibold">
										Latest & Greatest
									</div>
									<div className="mt-10">
										<div className="grid grid-cols-2 md:grid-cols-3 gap-x-1 gap-y-5 max-w-4xl mx-auto">
											{shuffledProducts.map(
												(product: IProduct, index: number) => (
													<AnimatePresence key={index} mode="wait">
														<motion.div
															initial={{ opacity: 0, y: 20 }}
															whileInView={{ opacity: 1, y: 0 }}
															transition={{ duration: 0.5, delay: index * 0.1 }}
															viewport={{ once: true }}
														>
															<ProductCard
																key={product._id}
																product={product}
															/>
														</motion.div>
													</AnimatePresence>
												)
											)}
										</div>
										<div className="flex justify-center items-center mt-10 md:mt-16">
											<Link href="/products" className="shop-now-btn">
												Explore All Products
											</Link>
										</div>
									</div>
								</div>
							</div>
						</section>
					)
				: null}
		</>
	);
}
