// import { useState, useEffect } from "react";
// const QUERY = "(prefers-reduced-motion: no-preference)";
// const isRenderingOnServer = typeof window === "undefined";

// const getInitialState = () =>
// 	isRenderingOnServer ? true : !window.matchMedia(QUERY).matches;

// export const usePrefersReducedMotion = () => {
// 	if (typeof window === "undefined") {
// 		return true;
// 	}

// 	const [prefersReducedMotion, setPrefersReducedMotion] =
// 		useState(getInitialState);

// 	useEffect(() => {
// 		const mediaQueryList = window.matchMedia(QUERY);
// 		const listener = (event: MediaQueryListEvent) => {
// 			setPrefersReducedMotion(!event.matches);
// 		};
// 		mediaQueryList.addEventListener("change", listener);
// 		return () => {
// 			mediaQueryList.removeEventListener("change", listener);
// 		};
// 	}, []);

// 	return prefersReducedMotion;
// };

// export const useMediaQuery = (query: string): boolean => {
// 	const [matches, setMatches] = useState(false);

// 	useEffect(() => {
// 		const media = window.matchMedia(query);
// 		if (media.matches !== matches) {
// 			setMatches(media.matches);
// 		}
// 		const listener = () => setMatches(media.matches);
// 		window.addEventListener("resize", listener);
// 		return () => window.removeEventListener("resize", listener);
// 	}, [matches, query]);

// 	return matches;
// };
