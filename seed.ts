import * as dotenv from "dotenv";
import fetch from "node-fetch";
import { resolve } from "path";

// Load environment variables from .env.local
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

interface StateData {
	name: string;
	zone: string;
	price: number;
}
const statesData = [
	{ name: "Abia", zone: "East", price: 500 },
	{ name: "Adamawa", zone: "North", price: 800 },
	{ name: "Akwa Ibom", zone: "South", price: 600 },
	{ name: "Anambra", zone: "East", price: 500 },
	{ name: "Bauchi", zone: "North", price: 800 },
	{ name: "Bayelsa", zone: "South", price: 600 },
	{ name: "Benue", zone: "North", price: 700 },
	{ name: "Borno", zone: "North", price: 800 },
	{ name: "Cross River", zone: "South", price: 600 },
	{ name: "Delta", zone: "South", price: 600 },
	{ name: "Ebonyi", zone: "East", price: 500 },
	{ name: "Edo", zone: "South", price: 600 },
	{ name: "Ekiti", zone: "West", price: 400 },
	{ name: "Enugu", zone: "East", price: 500 },
	{ name: "Gombe", zone: "North", price: 800 },
	{ name: "Imo", zone: "East", price: 500 },
	{ name: "Jigawa", zone: "North", price: 700 },
	{ name: "Kaduna", zone: "North", price: 700 },
	{ name: "Kano", zone: "North", price: 700 },
	{ name: "Katsina", zone: "North", price: 700 },
	{ name: "Kebbi", zone: "North", price: 700 },
	{ name: "Kogi", zone: "North", price: 700 },
	{ name: "Kwara", zone: "North", price: 700 },
	{ name: "Lagos", zone: "West", price: 400 },
	{ name: "Nasarawa", zone: "North", price: 700 },
	{ name: "Niger", zone: "North", price: 700 },
	{ name: "Ogun", zone: "West", price: 400 },
	{ name: "Ondo", zone: "West", price: 400 },
	{ name: "Osun", zone: "West", price: 400 },
	{ name: "Oyo", zone: "West", price: 400 },
	{ name: "Plateau", zone: "North", price: 700 },
	{ name: "Rivers", zone: "South", price: 600 },
	{ name: "Sokoto", zone: "North", price: 700 },
	{ name: "Taraba", zone: "North", price: 800 },
	{ name: "Yobe", zone: "North", price: 800 },
	{ name: "Zamfara", zone: "North", price: 700 },
];

// Validate environment variables
const requiredEnvVars = {
	NEXT_PUBLIC_SANITY_PROJECT_ID:
		process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
		process.env.SANITY_STUDIO_PROJECT_ID,
	SANITY_STUDIO_TOKEN: process.env.SANITY_STUDIO_TOKEN,
	SANITY_API_VERSION: process.env.SANITY_API_VERSION || "2024-12-15",
	SANITY_STUDIO_DATASET:
		process.env.SANITY_STUDIO_DATASET ||
		process.env.NEXT_PUBLIC_SANITY_DATASET ||
		"production",
} as const;

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
	.filter(([_, value]) => !value)
	.map(([key]) => key);

if (missingVars.length > 0) {
	console.error(
		"Missing required environment variables:",
		missingVars.join(", ")
	);
	process.exit(1);
}

// Construct the Sanity URL
const sanityUrl = `https://${requiredEnvVars.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v${requiredEnvVars.SANITY_API_VERSION}/data/mutate/${requiredEnvVars.SANITY_STUDIO_DATASET}`;

interface SanityResponse {
	transactionId?: string;
	results?: any[];
	error?: string;
	message?: string;
}

async function seedStates(): Promise<void> {
	try {
		console.log("Starting seeding process...");
		console.log("Using Sanity URL:", sanityUrl);
		console.log("Project ID:", requiredEnvVars.NEXT_PUBLIC_SANITY_PROJECT_ID);
		console.log("Dataset:", requiredEnvVars.SANITY_STUDIO_DATASET);

		// Map statesData to the mutation format
		const mutations = statesData.map((state: StateData) => ({
			create: {
				_type: "state",
				name: state.name,
				zone: state.zone,
				price: state.price,
			},
		}));

		// Send data to Sanity API
		const response = await fetch(sanityUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${requiredEnvVars.SANITY_STUDIO_TOKEN}`,
			},
			body: JSON.stringify({ mutations }),
		});

		const result = (await response.json()) as SanityResponse;

		if (response.ok) {
			console.log("✅ Seeding completed successfully");
			console.log("Results:", result);
		} else {
			console.error("❌ Error seeding data:", result);
			console.error("Status:", response.status);
			console.error("Status Text:", response.statusText);
		}
	} catch (error) {
		console.error("❌ Error during seeding:", error);
	}
}

// Run seeding
seedStates();
