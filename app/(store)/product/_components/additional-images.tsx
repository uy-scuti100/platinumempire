"use client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./relatedGoods/imageModal";

export default function AdditionalImages({
	imageUrls,
}: {
	imageUrls: string[];
}) {
	const [zoomImageUrl, setZoomImageUrl] = useState<string | null>(null);
	return (
		<figure className="px-4 mt-20 mx-auto max-w-[1920px]">
			<h2 className="mb-6 text-2xl font-semibold ">Get a Closer Look 👀</h2>
			<figcaption className="grid grid-cols-2 place-items-center gap-x-1 gap-y-1 lg:grid-cols-3 auto-rows-fr">
				{imageUrls?.map((imageUrl, index) => (
					<div
						key={index}
						className={`relative w-full ${
							index === imageUrls.length - 1 && imageUrls.length % 2 !== 0
								? "col-span-2 md:col-span-3 "
								: ""
						} h-72 sm:h-64 lg:h-[600px]`}
						onClick={() => setZoomImageUrl(urlFor(imageUrl).url())}
					>
						<Image
							src={urlFor(imageUrl).url()}
							alt={`Image ${index + 1}`}
							fill
							loading="lazy"
							className="object-cover w-full h-full"
							sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
						/>
					</div>
				))}
			</figcaption>
			<ImageModal
				isOpen={!!zoomImageUrl}
				src={zoomImageUrl || ""}
				alt="Zoomed Image"
				onCloseAction={() => setZoomImageUrl(null)}
			/>
		</figure>
	);
}
