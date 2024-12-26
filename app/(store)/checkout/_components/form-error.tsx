import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

const FormErrorSummary = ({
	errors,
}: {
	errors: Record<string, { message: string }>;
}) => {
	if (Object.keys(errors).length === 0) return null;

	return (
		<Alert variant="destructive" className="mt-4">
			<ExclamationTriangleIcon className="h-4 w-4" />
			<AlertDescription>
				<p className="font-medium mb-2 text-lg">
					Please fill all required fields above
				</p>
			</AlertDescription>
		</Alert>
	);
};
export default FormErrorSummary;

{
	/* <ul className="list-disc pl-4 space-y-1">
					{Object.entries(errors).map(([field, error]) => (
						<li key={field}>{error.message}</li>
					))}
				</ul> */
}
