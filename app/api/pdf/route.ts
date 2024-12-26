// app/api/pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function POST(request: NextRequest) {
	try {
		const { orderData } = await request.json();

		const browser = await puppeteer.launch({
			headless: true,
		});

		const page = await browser.newPage();

		// Set viewport for better rendering
		await page.setViewport({
			width: 1200,
			height: 1600,
			deviceScaleFactor: 2, // Higher resolution for better quality
		});

		// Wait longer for images to load
		await page.setDefaultNavigationTimeout(60000);

		const url = `https://platinumempire.vercel.app/thank-you?data=${encodeURIComponent(JSON.stringify(orderData))}`;

		// Navigate and wait for network to be idle
		await page.goto(url, {
			waitUntil: ["networkidle0", "domcontentloaded"],
		});

		// Inject print-specific styles
		await page.addStyleTag({
			content: `
        @media print {
          .print\\:hidden {
            display: none !important;
          }
          
          .receipt {
            padding: 20px !important;
            max-width: none !important;
          }
          
          img {
            display: block !important;
            max-width: 100% !important;
            height: auto !important;
          }
          
          /* Ensure table fits in PDF */
          table {
            width: 100% !important;
            font-size: 12px !important;
          }
          
          /* Fix image container in table */
          td .relative {
            width: 40px !important;
            height: 40px !important;
            display: inline-block !important;
            position: relative !important;
          }

          /* Improve spacing */
          .space-y-6 > * {
            margin-top: 1.2rem !important;
            margin-bottom: 1.2rem !important;
          }

          /* Ensure text is readable */
          p, span {
            font-size: 16px !important;
            line-height: 1.4 !important;
          }

          h1 {
            font-size: 24px !important;
          }

          h2 {
            font-size: 16px !important;
          }
        }
      `,
		});

		// Wait for images to load
		await page.evaluate(() => {
			return Promise.all(
				Array.from(document.images)
					.filter((img) => !img.complete)
					.map(
						(img) =>
							new Promise((resolve) => {
								img.onload = img.onerror = resolve;
							})
					)
			);
		});

		// Generate PDF
		const pdf = await page.pdf({
			format: "A4",
			margin: {
				top: "20px",
				right: "20px",
				bottom: "20px",
				left: "20px",
			},
			printBackground: true,
			preferCSSPageSize: true,
		});

		await browser.close();

		const response = new NextResponse(pdf);
		response.headers.set("Content-Type", "application/pdf");
		response.headers.set(
			"Content-Disposition",
			`attachment; filename=order-${orderData.orderNumber}.pdf`
		);

		return response;
	} catch (error) {
		console.error("PDF generation error:", error);
		return NextResponse.json(
			{ error: "Error generating PDF" },
			{ status: 500 }
		);
	}
}
