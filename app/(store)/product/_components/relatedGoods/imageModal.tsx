import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface ImageModalProps {
	isOpen: boolean;
	src: string;
	alt: string;
	onCloseAction: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
	src,
	alt,
	onCloseAction,
	isOpen,
}: ImageModalProps) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [scale, setScale] = useState(1);
	const [isDragging, setIsDragging] = useState(false);
	const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);

	const calculateInitialScale = useCallback(() => {
		if (!imageRef.current || !containerRef.current) return;

		const container = containerRef.current;
		const image = imageRef.current;

		const containerWidth = container.clientWidth;
		const containerHeight = container.clientHeight;
		const imageNaturalWidth = image.naturalWidth;
		const imageNaturalHeight = image.naturalHeight;

		const scaleX = (containerWidth / imageNaturalWidth) * 1.5;
		const scaleY = (containerHeight / imageNaturalHeight) * 1.5;

		setScale(Math.max(scaleX, scaleY));
	}, []);

	const calculateBoundaries = (newPosition: { x: number; y: number }) => {
		if (!containerRef.current || !imageRef.current) return newPosition;

		const container = containerRef.current;
		const image = imageRef.current;

		// Calculate scaled dimensions
		const scaledWidth = image.naturalWidth * scale;
		const scaledHeight = image.naturalHeight * scale;

		// Calculate maximum allowed movement
		const maxX = (scaledWidth - container.clientWidth) / 2;
		const maxY = (scaledHeight - container.clientHeight) / 2;

		// Return constrained position
		return {
			x: Math.min(Math.max(newPosition.x, -maxX), maxX),
			y: Math.min(Math.max(newPosition.y, -maxY), maxY),
		};
	};

	const handleMouseMove = useCallback(
		(e: React.MouseEvent | React.TouchEvent) => {
			if (!isDragging) return;
			const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
			const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

			const newPosition = {
				x: clientX - startPosition.x,
				y: clientY - startPosition.y,
			};

			// Apply boundary constraints
			const constrainedPosition = calculateBoundaries(newPosition);
			setPosition(constrainedPosition);
		},
		[isDragging, startPosition, scale] // Added scale as dependency
	);

	const handleImageLoad = () => {
		calculateInitialScale();
	};

	const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
		e.preventDefault();
		setIsDragging(true);
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
		setStartPosition({
			x: clientX - position.x,
			y: clientY - position.y,
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
	};

	const handleWheel = (e: React.WheelEvent) => {
		e.preventDefault();
		const delta = e.deltaY * -0.01;
		const newScale = Math.min(Math.max(scale + delta, 1), 4);
		setScale(newScale);

		// Recalculate position constraints after scale change
		const constrainedPosition = calculateBoundaries(position);
		setPosition(constrainedPosition);
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					// className="fixed inset-0  bg-white bg-opacity-90 z-50 flex items-center justify-center"
					className="fixed inset-0 z-[999999] bg-white "
				>
					<motion.button
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.2 }}
						onClick={onCloseAction}
						className="fixed bottom-10 left-1/2 transition-all duration-500 -translate-x-1/2 -translate-y-1/2 z-[9999999] p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 "
						aria-label="Close zoom view"
					>
						<X className="w-10 h-10 text-red-500" />
					</motion.button>

					<div
						ref={containerRef}
						className="w-full h-full overflow-hidden relative "
						onMouseDown={handleMouseDown}
						onMouseMove={handleMouseMove}
						onMouseUp={handleMouseUp}
						onMouseLeave={handleMouseUp}
						onTouchStart={handleMouseDown}
						onTouchMove={handleMouseMove}
						onTouchEnd={handleMouseUp}
						onWheel={handleWheel}
					>
						<motion.img
							ref={imageRef}
							src={src}
							alt={alt}
							onLoad={handleImageLoad}
							className="absolute max-w-none w-auto h-auto select-none"
							style={{
								left: "50%",
								top: "50%",
								cursor: isDragging ? "grabbing" : "grab",
								touchAction: "none",
							}}
							height={2500}
							width={2500}
							initial={{ scale: 0.5, opacity: 0 }}
							animate={{
								scale: scale,
								opacity: 1,
								x: position.x,
								y: position.y,
								translateX: "-50%",
								translateY: "-50%",
							}}
							transition={{
								type: "spring",
								damping: 30,
								stiffness: 300,
								bounce: 0,
							}}
							draggable="false"
						/>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ImageModal;
