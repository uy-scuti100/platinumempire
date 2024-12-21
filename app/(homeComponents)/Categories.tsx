"use client";
import CategoryCard from "@/components/globalcomponents/CategoryCard";

import {
	InfoProp,
	menCategories,
	wommenCategories,
} from "@/constants/categories";

export default function Categories() {
	return (
		<section className="pt-20 px-5">
			<div className="mx-auto">
				<div>
					<div className="text-center md:text-4xl text-2xl font-semibold">
						{" "}
						Male Categories
					</div>
					<div className="mt-10">
						<div className="flex flex-wrap gap-5 max-w-4xl mx-auto">
							{menCategories.map((info: InfoProp, index: number) => (
								<CategoryCard info={info} key={index} />
							))}
						</div>
					</div>
				</div>
				<div className="mt-20">
					<div className="text-center md:text-4xl text-2xl font-semibold">
						Female Categories
					</div>
					<div className="mt-10">
						<div className="flex flex-wrap gap-5 max-w-4xl mx-auto">
							{wommenCategories.map((info: InfoProp, index: number) => (
								<CategoryCard key={index} info={info} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// {menCategories.map((info: InfoProp, index: number) => (
//     <AnimatePresence key={index} mode="wait">
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: index * 0.1 }}
//             viewport={{ once: true }}
//         >
//             <CategoryCard info={info} key={index} />
//         </motion.div>
//     </AnimatePresence>
//import { motion, AnimatePresence } from "framer-motion";
// ))}
