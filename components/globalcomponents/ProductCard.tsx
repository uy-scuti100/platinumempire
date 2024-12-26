import { IProduct } from "@/actions/products";
import { formatPriceInNaira } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

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
		<Link href={`/product/${slug}`}>
			<div>
				<div className="relative overflow-hidden group">
					{imageUrls && imageUrls.length > 0 && (
						<div className="md:h-[300px] h-[250px] relative overflow-hidden">
							<Image
								src={urlFor(imageUrls[0]).url()}
								alt={`${name}-image`}
								fill
								loading="lazy"
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
										sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
										loading="lazy"
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
			<div className="mt-3">
				<h6 className="text-slate-700 text-xs capitalize font-medium line-clamp-1">
					{name}
				</h6>
				<h6 className="text-[#1c1c1c] text-sm font-semibold  mt-2md:block">
					{onSale ? (
						<div className="">
							<div>
								<span className="text-[#808080] text-xs line-through mr-2">
									{formatPriceInNaira(Number(price))}
								</span>
								<span className="text-[#1c1c1c] text-xs ">
									{formatPriceInNaira(Number(discountedPrice))}
								</span>
							</div>
						</div>
					) : (
						<span className="text-[#1c1c1c] text-xs">
							{formatPriceInNaira(Number(price))}
						</span>
					)}
				</h6>
				{onSale && (
					<span className="text-[#D7373D] text-[10px] font-bold">On Sale</span>
				)}
			</div>
		</Link>
	);
}
