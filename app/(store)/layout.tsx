import Footer from "@/components/globalcomponents/footer";
import Navbar from "@/components/globalcomponents/navbar";
import TopLoader from "@/components/globalcomponents/top-loader";
import { siteConfig } from "@/lib/utils";
import Providers from "@/providers/react-query";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../globals.css";
const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},

	metadataBase: new URL(siteConfig.url),
	description: siteConfig.description,
	keywords: [
		"fashion",
		"clothing",
		"accessories",
		"shoes",
		"bags",
		"style",
		"fashion trends",
		"fashion hub",
		"fashion store",
		"fashion website",
		"online shopping",
		"modern fashion",
		"elegant style",
		"wardrobe essentials",
		"designer bags",
		"trendy shoes",
		"fashion blog",
		"platinum fashion hub",
		"fashion website",
		"online shopping",
		"modern fashion",
		"elegant style",
		"wardrobe essentials",
		"designer bags",
		"trendy shoes",
	],
	authors: [
		{
			name: "PLatinum Fashion Hub",
			url: "https://platinumempire.vercel.app/",
		},
	],
	creator: "Platunum Fashion Hub",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@hussain_joe",
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
};
export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#FFE4E1" },
		{ media: "(prefers-color-scheme: dark)", color: "#FFE793" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<Analytics />
				<TopLoader />

				<Providers>
					<Navbar />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
