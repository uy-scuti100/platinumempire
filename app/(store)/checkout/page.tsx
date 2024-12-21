import { Suspense } from "react";
import OrderSummary from "./components/order-summary";
import CheckoutForm from "./components/checkout-form";
import UpsellSection from "./components/upsell-section";
import { orderItems, upsellProducts } from "@/lib/data";

export default function CheckoutPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			<main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div>
						<Suspense fallback={<div>Loading order summary...</div>}>
							<OrderSummary items={orderItems} />
						</Suspense>
						<CheckoutForm />
					</div>
					<div>
						<Suspense fallback={<div>Loading recommendations...</div>}>
							<UpsellSection products={upsellProducts} />
						</Suspense>
					</div>
				</div>
			</main>
		</div>
	);
}
