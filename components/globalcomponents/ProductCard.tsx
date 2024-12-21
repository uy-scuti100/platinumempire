import { IProduct } from "@/actions";
import { formatPriceInNaira } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCard({ product }: { product: IProduct }) {
	const {
		name,
		imageUrls,
		price,
		lqips,
		slug,
		isNew,
		onSale,
		discountedPrice,
	} = product;

	return (
		<Link
			href={{ pathname: `/product/${slug}` }}
			scroll={true}
			onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
		>
			<div>
				<div className="relative overflow-hidden group">
					{imageUrls && imageUrls.length > 0 && (
						<div className="md:h-[300px] h-[250px] relative overflow-hidden">
							<Image
								src={urlFor(imageUrls[0]).url()}
								alt={`${name}-image`}
								fill
								className="object-cover w-full h-full"
								placeholder="blur"
								blurDataURL={lqips[0]}
							/>

							{imageUrls.length > 1 && (
								<div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
									<Image
										src={urlFor(imageUrls[1]).url()}
										alt={`${name}-image`}
										width={500}
										height={500}
										className="object-cover w-full h-full"
									/>
								</div>
							)}
						</div>
					)}

					{isNew && (
						<div className="absolute left-3 bottom-3">
							<span className="bg-[#E85A06] text-white px-2 py-1 text-xs font-medium uppercase">
								New
							</span>
						</div>
					)}
				</div>
			</div>
			<h6 className="text-[#808080] text-xs mt-5 capitalize">{name}</h6>
			<h6 className="text-[#1c1c1c] text-sm font-semibold mt-3 md:block">
				{onSale ? (
					<div className="flex items-center justify-between w-full text-xs ">
						<div>
							<span className="text-[#808080] text-xs line-through mr-2">
								{formatPriceInNaira(Number(discountedPrice))}
							</span>
							<span className="text-[#1c1c1c] text-xs">
								{formatPriceInNaira(Number(price))}
							</span>
						</div>
						<span className="rounded-full self-end text-[#D7373D] text-[10px]">
							On Sale
						</span>
					</div>
				) : (
					<span className="text-[#1c1c1c] text-xs">
						{formatPriceInNaira(Number(price))}
					</span>
				)}
			</h6>
		</Link>
	);
}
