"use server";

import { client } from "@/sanity/lib/client";
export interface State {
	_id: string;
	name: string;
	zone: string;
	price: number;
}
export interface Country {
	_id: string;
	name: string;
	price?: number;
}

export async function createOrder(orderData: any) {
	try {
		// Prepare Sanity mutation
		const mutation = {
			_key: crypto.randomUUID(),
			_type: "order",
			...orderData,
			createdAt: new Date().toISOString(),
		};
		// Send to Sanity
		const response = await fetch(
			`https://${process.env.SANITY_STUDIO_PROJECT_ID}.api.sanity.io/${process.env.SANITY_API_VERSION}/data/mutate/${process.env.SANITY_STUDIO_DATASET}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
				},
				body: JSON.stringify({ mutations: [{ create: mutation }] }),
			}
		);

		if (!response.ok) {
			throw new Error(`Sanity API Error: ${response.statusText}`);
		}

		const result = await response.json();

		return { success: true, orderId: result.results[0]._id };
	} catch (error) {
		console.error("Error creating order:", error);
		return { success: false, error: (error as Error).message };
	}
}

export async function fetchStates(): Promise<State[]> {
	const query = `*[_type == "state"] {
      _id,
      name,
      zone,
      price
    } | order(name asc)`;

	try {
		const states = await client.fetch<State[]>(query);
		return states;
	} catch (error) {
		console.error("Error fetching states:", error);
		return [];
	}
}
export async function fetchCountry(): Promise<Country[]> {
	const query = `*[_type == "country"] {
      _id,
      name,
      price
    } | order(name asc)`;

	try {
		const states = await client.fetch<Country[]>(query);
		return states;
	} catch (error) {
		console.error("Error fetching states:", error);
		return [];
	}
}

// Get all states and countries with error handling
export async function getStatesAndCountriesWithErrorHandling() {
	try {
		const [states, countries] = await Promise.all([
			fetchStates(),
			fetchCountry(),
		]);
		if (states.length === 0 || countries.length === 0) {
			console.error("No states or countries found or error occurred");
			return null;
		}
		return { states, countries };
	} catch (error) {
		console.error("Error in getStatesAndCountriesWithErrorHandling:", error);
		return null;
	}
}

// In your order creation function
export const sendNotification = async (orderData: any) => {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_APP_URL}/api/order/notification`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ orderData }),
			}
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}
	} catch (error) {
		console.error("Failed to send store notification:", error);
	}
};
