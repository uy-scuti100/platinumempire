import NextTopLoader from "nextjs-toploader";
export default function TopLoader() {
	return (
		<>
			<NextTopLoader
				color="#DA0205"
				initialPosition={0.15}
				crawlSpeed={200}
				height={3}
				crawl={true}
				showSpinner={false}
				easing="ease"
				speed={200}
				shadow="0 0 10px #DA0205,0 0 5px #DA0205"
			/>
		</>
	);
}
