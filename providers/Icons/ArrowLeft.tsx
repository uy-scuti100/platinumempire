import React from "react";

export default function ArrowLeft({ className }: { className?: string }) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			shape-rendering="geometricPrecision"
			text-rendering="geometricPrecision"
			image-rendering="optimizeQuality"
			fill-rule="evenodd"
			clip-rule="evenodd"
			fill="#fff"
			viewBox="0 0 512 243.58"
			width={50}
			height={30}
			className={className}
		>
			<path
				fill-rule="nonzero"
				d="M138.43 243.58 0 122.84 140.47 0l20.92 23.91-94.92 83 445.53-.42v31.75l-445.54.41 92.89 81.02z"
			/>
		</svg>
	);
}
