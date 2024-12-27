import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export function CheckoutWarning() {
	return (
		<Alert
			variant="warning"
			className="mb-4 border-2 border-yellow-200 bg-yellow-50 rounded-none"
		>
			<AlertTriangle className="h-5 w-5 text-yellow-600" />
			<AlertTitle className="text-lg font-semibold text-yellow-800 mb-2">
				Important Shipping Information
			</AlertTitle>
			<AlertDescription className="text-yellow-700">
				<div>
					Shipping fees are estimates and may change slightly based on the
					package weight or currency exchange rates.
				</div>
				<div>
					<div className="font-bold py-2 uppercase">Delivery Timelines:</div>
					<menu>
						<li className="list-disc">Within Ilorin: 3 working days.</li>
						<li className="list-disc">Outside Ilorin: 3-7 working days.</li>
					</menu>
				</div>
			</AlertDescription>
		</Alert>
	);
}
