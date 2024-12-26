"use client";
import { useEffect, useState } from "react";

function useDebouncedSearch(delay = 500) {
	const [searchTerm, setSearchTerm] = useState("");
	const [debouncedTerm, setDebouncedTerm] = useState("");
	const [isDebouncing, setIsDebouncing] = useState(false);

	useEffect(() => {
		// Set debouncing status to true when search term changes
		if (searchTerm !== debouncedTerm) {
			setIsDebouncing(true);
		}

		// Create a timeout to update the debounced value
		const timer = setTimeout(() => {
			setDebouncedTerm(searchTerm);
			setIsDebouncing(false);
		}, delay);

		// Cleanup timeout on each change
		return () => clearTimeout(timer);
	}, [searchTerm, delay, debouncedTerm]);

	return {
		searchTerm,
		debouncedTerm,
		setSearchTerm,
		isDebouncing,
	};
}

export default useDebouncedSearch;
