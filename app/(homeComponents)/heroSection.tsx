"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [, setProgress] = useState(0);

	const carousel = [
		{
			img: "/slider41.jpg",
			text: "Beautiful 2-Piece Set",
		},
		{
			img: "/5701f61d78d5391b5018196334637925.jpg",
			text: "Premium Male Trousers",
		},
		{
			img: "/arno-senoner-oCXVxwTFwqE-unsplash.jpg",
			text: "Top-Quality Bags",
		},
		{
			img: "/slider2.jpg",
			text: "Affordable Cozy Hoodies",
		},
		{
			img: "/slider3.jpg",
			text: "Stylish Female Cargo Pants",
		},
		{
			img: "/fineshoe.jpg",
			text: "Trendy Unisex Shoes",
		},
	];

	const nextSlide = () => {
		if (currentSlide === carousel.length - 1) {
			setCurrentSlide(0);
		} else {
			setCurrentSlide(currentSlide + 1);
		}
	};

	const slideVariants = {
		initial: { opacity: 0, scale: 1.1 },
		animate: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.7,
				ease: "easeInOut",
			},
		},
		exit: {
			opacity: 0,
			scale: 0.9,
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
	};

	const textVariants = {
		initial: { y: 50, opacity: 0 },
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
			},
		},
	};

	const goToSlide = (index: number) => {
		setCurrentSlide(index);
	};

	// Auto-scroll logic
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 2500);

		return () => clearInterval(interval);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSlide]);

	// Progress bar logic
	useEffect(() => {
		setProgress(0);
		const progressInterval = setInterval(() => {
			setProgress((prev) => (prev < 100 ? prev + 5 : prev));
		}, 100);

		return () => clearInterval(progressInterval);
	}, [currentSlide]);

	return (
		<section
			style={{ minHeight: "calc(100vh - 50px)" }}
			className="w-full relative overflow-hidden"
		>
			<div
				className="flex w-[600vw] h-full transition-transform duration-500 ease-in-out"
				style={{ transform: `translateX(-${currentSlide * 100}vw)` }}
			>
				{carousel.map((slide, index) => (
					<AnimatePresence mode="wait" key={index}>
						<motion.div
							className="relative w-[100vw] h-[100vh] flex items-center justify-center"
							variants={slideVariants}
							initial="initial"
							animate="animate"
							exit="exit"
						>
							<Image
								src={slide.img}
								alt={`hero-pic-${index + 1}`}
								className="w-[100vw] h-[100vh] object-cover"
								width={500}
								height={500}
								sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1060px) 75vw, 60vw"
								loading="lazy"
							/>
							<span className="absolute inset-0 bg-black/30" />

							{/* Text Content with Animation */}
							<AnimatePresence>
								{currentSlide === index && (
									<motion.div
										key={index}
										initial={{ opacity: 0, y: 150 }}
										animate={{ opacity: 1, y: 100 }}
										// exit={{ opacity: 0, y: -50 }}
										variants={textVariants}
										transition={{ duration: 0.8, ease: "easeInOut" }}
										className="absolute text-center text-white px-4 py-4 bg-black/50 rounded-md mx-3"
									>
										<h1 className="text-2xl font-bold uppercase">
											{slide.text}
										</h1>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					</AnimatePresence>
				))}
			</div>

			{/* Indicators */}
			<div className="absolute bottom-16 left-24 md:right-48 md:left-48 right-24 flex justify-center gap-4">
				{carousel.map((_, index) => (
					<button
						key={index}
						onClick={() => goToSlide(index)}
						className="relative w-full h-0.5 rounded-full overflow-hidden bg-gray-300"
					>
						{/* Background fill animation */}
						<motion.div
							className="absolute top-0 left-0 h-full bg-custom"
							initial={{ width: 0 }}
							animate={{
								width: currentSlide === index ? "100%" : "0%",
							}}
							transition={{ duration: 2, ease: "linear" }}
						/>

						{/* Border fill animation */}
						<motion.div
							className="absolute inset-0 rounded-full border-2"
							style={{
								borderColor: currentSlide === index ? "#E85A06" : "#d1d5db",
							}}
							initial={{ opacity: 0 }}
							animate={{
								opacity: currentSlide === index ? 1 : 0,
							}}
							transition={{ duration: 2, ease: "linear" }}
						/>
					</button>
				))}
			</div>
		</section>
	);
}

{
	/* <Link
										href="/"
										className="px-5 py-3 bg-custom hover:bg-custom/70 text-white uppercase font-bold text-sm tracking-wide"
									>
										Shop Now
									</Link> */
}
