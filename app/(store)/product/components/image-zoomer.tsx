import { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import { X } from "lucide-react";

// import {
// 	motion,
// 	AnimatePresence,
// 	useSpring,
// 	useTransform,
// 	useMotionValue,
// } from "framer-motion";

// interface ZoomModalProps {
// 	isOpen: boolean;
// 	onClose: () => void;
// 	imageUrl: string;
// 	alt: string;
// }

// export const ZoomModal = ({
// 	isOpen,
// 	onClose,
// 	imageUrl,
// 	alt,
// }: ZoomModalProps) => {
// 	const containerRef = useRef<HTMLDivElement>(null);
// 	const [isDragging, setIsDragging] = useState(false);

// 	const x = useMotionValue(0);
// 	const y = useMotionValue(0);

// 	const smoothX = useSpring(x, {
// 		damping: 50,
// 		stiffness: 400,
// 		mass: 1,
// 	});

// 	const smoothY = useSpring(y, {
// 		damping: 50,
// 		stiffness: 400,
// 		mass: 1,
// 	});

// 	useEffect(() => {
// 		if (isOpen) {
// 			document.body.style.overflow = "hidden";
// 		} else {
// 			document.body.style.overflow = "unset";
// 		}
// 		return () => {
// 			document.body.style.overflow = "unset";
// 		};
// 	}, [isOpen]);

// 	const handleDragStart = () => {
// 		setIsDragging(true);
// 	};

// 	const handleDragEnd = () => {
// 		setIsDragging(false);
// 	};

// 	if (!isOpen) return null;

// 	return (
// 		<AnimatePresence>
// 			{isOpen && (
// 				<motion.div
// 					initial={{ opacity: 0 }}
// 					animate={{ opacity: 1 }}
// 					exit={{ opacity: 0 }}
// 					transition={{ duration: 0.2 }}
// 					className="fixed inset-0 z-[999999] bg-black/95"
// 				>
// 					<motion.button
// 						initial={{ opacity: 0, scale: 0.9 }}
// 						animate={{ opacity: 1, scale: 1 }}
// 						exit={{ opacity: 0, scale: 0.9 }}
// 						transition={{ duration: 0.2 }}
// 						onClick={onClose}
// 						className="fixed top-4 right-4 z-[60] p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
// 						aria-label="Close zoom view"
// 					>
// 						<X className="w-6 h-6 text-red-600" />
// 					</motion.button>

// 					<div
// 						ref={containerRef}
// 						className={`min-h-screen w-full overflow-hidden ${
// 							isDragging ? "cursor-grabbing" : "cursor-grab"
// 						}`}
// 						style={{
// 							scrollbarWidth: "none",
// 							msOverflowStyle: "none",
// 						}}
// 					>
// 						<motion.div
// 							className="min-h-[100vh] w-full flex items-center justify-center p-4"
// 							drag
// 							dragConstraints={containerRef}
// 							dragElastic={0.1}
// 							dragTransition={{
// 								bounceStiffness: 400,
// 								bounceDamping: 20,
// 							}}
// 							onDragStart={handleDragStart}
// 							onDragEnd={handleDragEnd}
// 							style={{ x: smoothX, y: smoothY }}
// 						>
// 							<motion.div
// 								className="relative w-full h-full select-none"
// 								initial={{ scale: 0.9, opacity: 0 }}
// 								animate={{ scale: 1, opacity: 1 }}
// 								exit={{ scale: 0.9, opacity: 0 }}
// 								transition={{ duration: 0.3 }}
// 							>
// 								<Image
// 									src={imageUrl}
// 									alt={alt}
// 									width={3000}
// 									height={3000}
// 									className="w-full h-auto pointer-events-none"
// 									style={{
// 										maxWidth: "none",
// 										width: "150%",
// 										transform: "translate(0, 0)",
// 									}}
// 									draggable={true}
// 								/>
// 							</motion.div>
// 						</motion.div>
// 					</div>

// 					<style jsx global>{`
// 						.overflow-hidden::-webkit-scrollbar {
// 							display: none;
// 						}
// 					`}</style>
// 				</motion.div>
// 			)}
// 		</AnimatePresence>
// 	);
// };

/* <X className="w-6 h-6 text-red-500" />
<div className="fixed inset-0 z-[9999999999] bg-black/95 overflow-auto"> */
// }

// import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface ZoomModalProps {
	isOpen: boolean;
	onClose: () => void;
	imageUrl: string;
	alt: string;
}

export const ZoomModal = ({
	isOpen,
	onClose,
	imageUrl,
	alt,
}: ZoomModalProps) => {
	const [isDragging, setIsDragging] = useState(false);
	const constraintsRef = useRef<HTMLDivElement>(null);

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

	if (!isOpen) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="fixed inset-0 z-[999999] bg-white"
					ref={constraintsRef}
				>
					{/* Close Button */}
					<motion.button
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.9 }}
						transition={{ duration: 0.2 }}
						onClick={onClose}
						className="fixed bottom-10 left-1/2 transition-all duration-500 -translate-x-1/2 -translate-y-1/2 z-[9999999] p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 "
						aria-label="Close zoom view"
					>
						<X className="w-10 h-10 text-red-500" />
					</motion.button>
					{/* Draggable Content */}
					<div
						className={`min-h-screen min-w-screen overflow-hidden ${
							isDragging ? "cursor-grabbing" : "cursor-grab"
						}`}
					>
						<motion.div
							drag
							dragConstraints={constraintsRef}
							dragElastic={0.1} // Allows smoother dragging
							dragMomentum={true}
							onDragStart={() => setIsDragging(true)}
							onDragEnd={() => setIsDragging(false)}
							className={`h-full w-full flex items-center justify-center`}
						>
							<motion.div
								className="relative flex items-center justify-center w-full h-auto select-none"
								initial={{ scale: 0.9, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.9, opacity: 0 }}
								transition={{ duration: 0.3 }}
								layoutId="zoom-image"
							>
								<Image
									src={imageUrl}
									alt={alt}
									height={2500}
									width={2500}
									className="h-full pointer-events-none w-[150%] object-cover max-w-none"
									draggable={false}
								/>
							</motion.div>
						</motion.div>
					</div>

					<style jsx global>{`
						.overflow-hidden::-webkit-scrollbar {
							display: none;
						}
					`}</style>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
