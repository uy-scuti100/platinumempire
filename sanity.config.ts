"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import Logo from "@/components/globalcomponents/logo";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { lowercasePlugin } from "./sanity/schemas/documentHooks";

export default defineConfig({
	name: "Platinum-Fashion-Hub",
	logo: Logo,
	basePath: "/admin",
	projectId,
	dataset,
	schema,
	plugins: [
		// media({
		// 	creditLine: {
		// 		enabled: true,
		// 		excludeSources: ["unsplash"],
		// 	},
		// 	maximumUploadSize: 10000000,
		// }),
		structureTool({ structure }),
		visionTool({ defaultApiVersion: apiVersion }),
		lowercasePlugin,
	],
	// form: {
	// 	image: {
	// 		assetSources: (previousAssetSources) => {
	// 			return previousAssetSources.filter(
	// 				(assetSource) => assetSource !== mediaAssetSource
	// 			);
	// 		},
	// 	},
	// 	file: {
	// 		assetSources: (previousAssetSources) => {
	// 			return previousAssetSources.filter(
	// 				(assetSource) => assetSource !== mediaAssetSource
	// 			);
	// 		},
	// 	},
	// },
});
