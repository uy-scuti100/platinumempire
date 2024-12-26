"use client";
import { IProduct } from "@/actions/products";
import { urlFor } from "@/sanity/lib/image";

import Image from "next/image";
import { useState } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ZoomModal } from "./image-zoomer";

export default function ProductImageComponent({
	product,
	isMobile,
}: {
	product: IProduct;
	isMobile: boolean;
}) {
	const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);
	const IMAGECOUNT =
		product?.imageUrls?.length > 4 ? 4 : product?.imageUrls?.length;
	const PRODUCTIMAGES = product && product?.imageUrls?.slice(0, IMAGECOUNT);

	const getGridClass = (index: number) => {
		if (IMAGECOUNT === 1) return "col-span-2 row-span-2";
		if (IMAGECOUNT === 2) return "col-span-1 row-span-2";
		if (IMAGECOUNT === 3 && index === 2) return "col-span-2";
		return "";
	};

	return (
		<div className="w-full h-full">
			{isMobile ? (
				<Swiper
					modules={[Pagination, Autoplay]}
					className="productSlider"
					autoplay={{
						delay: 3000,
						pauseOnMouseEnter: true,
						disableOnInteraction: true,
					}}
					pagination={{ clickable: true }}
					loop
				>
					{PRODUCTIMAGES.map((image, index) => (
						<SwiperSlide
							key={index}
							className="relative h-[500px] w-full "
							onClick={() => setZoomImageUrl(urlFor(image).url())}
						>
							<Image
								src={urlFor(image).url()}
								width={500}
								height={500}
								blurDataURL={product.lqips?.[index]}
								alt={`${product?.name} - image`}
								className="object-cover w-full h-[500px] cursor-zoom-in"
								sizes="(min-width: 808px) 50vw, 100vw"
								priority={false}
								style={{
									objectFit: "cover",
									width: "100%",
									height: "500px",
								}}
							/>
							{
								<div className="absolute top-3 right-3 ">
									<MdOutlineZoomOutMap className="w-6 h-6 text-custom cursor-zoom-out" />
								</div>
							}
							{product.isNew && (
								<div className="absolute left-3 bottom-3">
									<span className="bg-[#E85A06] text-white px-2 py-1 text-xs font-medium uppercase">
										New Arrival
									</span>
								</div>
							)}
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div
					className={`hidden sm:grid grid-cols-2 grid-rows-2 gap-2 w-full ${IMAGECOUNT === 1 ? "min-h-[700px] h-full" : "aspect-square"}`}
				>
					{product?.imageUrls?.slice(0, 4).map((image, index) => (
						<div
							key={index}
							className={`relative ${getGridClass(index)}`}
							onClick={() => setZoomImageUrl(urlFor(image).url())}
						>
							<Image
								src={urlFor(image).url()}
								fill
								blurDataURL={product.lqips?.[index]}
								placeholder="blur"
								alt={product?.name ?? ""}
								className={`object-cover w-[500px] h-[500px] cursor-zoom-in ${IMAGECOUNT === 3 && index === 2 && "object-bottom"}`}
								sizes="(min-width: 568px) 33vw"
								loading="lazy"
							/>

							{product.isNew && (
								<div className="absolute left-3 bottom-3">
									<span className="bg-[#E85A06] text-white px-2 py-1 text-xs font-medium uppercase cursor-zoom-in">
										New Arrival
									</span>
								</div>
							)}
						</div>
					))}
				</div>
			)}
			<ZoomModal
				isOpen={!!zoomImageUrl}
				onClose={() => setZoomImageUrl(null)}
				imageUrl={zoomImageUrl || ""}
				alt={product?.name || ""}
			/>
		</div>
	);
}
