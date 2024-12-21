"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { useState } from "react";

function cn(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

interface ImageProviderProps {
	image: any;
	alt: string;
	width?: number;
	height?: number;
	className?: string;
	fill?: boolean;
	placeholder?: string;
	style?: any;
}

export default function ImageProvider({
	image,
	alt,
	width,
	height,
	className,
	fill,
	style,
}: ImageProviderProps) {
	const [isLoading, setLoading] = useState(true);
	return (
		<div className={`relative`}>
			<Image
				src={urlFor(image).url()!}
				alt={alt}
				style={style}
				width={width}
				height={height}
				fill={fill}
				className={
					cn(
						"duration-700 ease-in-out",
						isLoading
							? "grayscale blur-2xl scale-110"
							: "grayscale-0 blur-0 scale-100"
					) +
					" " +
					className
				}
				onLoad={() => setLoading(false)}
				sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
			/>
		</div>
	);
}
