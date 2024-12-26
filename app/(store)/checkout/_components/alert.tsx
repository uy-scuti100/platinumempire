import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function CheckoutWarning() {
	return (
		<Alert
			variant="warning"
			className="mb-4 border-2 border-yellow-200 bg-yellow-50"
		>
			<AlertTriangle className="h-5 w-5 text-yellow-600" />
			<AlertTitle className="text-lg font-semibold text-yellow-800 mb-2">
				Important Shipping Information
			</AlertTitle>
			<AlertDescription className="text-yellow-700">
				Shipping fees displayed are estimates and may be adjusted based on final
				exchange rates and package weight.
			</AlertDescription>
		</Alert>
	);
}

{
	/* <p className="mb-2">
					Please be aware that your final shipping fee may vary due to the
					following factors:
				</p>
				<ul className="list-disc list-inside space-y-1">
					<li>
						<span className="font-semibold">Exchange Rate:</span> The fee might
						change based on the
						<span className="font-semibold">
							{" "}
							exchange rate at the time of purchase
						</span>
						.
					</li>
					<li>
						<span className="font-semibold">Package Weight:</span> The shipping
						cost may be adjusted according to the
						<span className="font-semibold"> total weight of items</span> in
						your cart.
					</li>
				</ul>
				<p className="mt-2 font-medium">
					We'll calculate the final shipping cost before processing your order.
				</p> */
}
