import { useEffect, useState } from "react";
import Confetti from "react-confetti";

interface ConfettiSuccessProps {
	isActive: boolean;
}

interface ViewportState {
	width: number;
	height: number;
	scrollY: number;
}

export default function ConfettiSuccess({ isActive }: ConfettiSuccessProps) {
	const [viewport, setViewport] = useState<ViewportState>({
		width: 0,
		height: 0,
		scrollY: 0,
	});
	const [isConfettiActive, setIsConfettiActive] = useState(false);

	useEffect(() => {
		function updateViewport() {
			setViewport({
				width: window.innerWidth,
				height: window.innerHeight,
				scrollY: window.scrollY,
			});
		}

		// Initial update
		updateViewport();

		// Add event listeners for both resize and scroll
		window.addEventListener("resize", updateViewport);
		window.addEventListener("scroll", updateViewport);

		// Cleanup
		return () => {
			window.removeEventListener("resize", updateViewport);
			window.removeEventListener("scroll", updateViewport);
		};
	}, []);

	useEffect(() => {
		if (isActive) {
			setIsConfettiActive(true);
			const timer = setTimeout(() => {
				setIsConfettiActive(false);
			}, 5000);

			return () => clearTimeout(timer);
		}
	}, [isActive]);

	if (!isConfettiActive) return null;

	return (
		<div
			style={{
				position: "absolute",
				top: viewport.scrollY,
				left: 0,
				width: "100%",
				height: "100vh",
				pointerEvents: "none",
				zIndex: 1000,
			}}
		>
			<Confetti
				width={viewport.width}
				height={viewport.height}
				recycle={false}
				numberOfPieces={200}
				gravity={0.3}
				initialVelocityY={10}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
				}}
			/>
		</div>
	);
}
