"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { MyLogo } from "./components/globalcomponents/my-logo";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { lowercasePlugin } from "./sanity/schemas/documentHooks";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";

export default defineConfig({
	name: "Platinum-Fashion-Hub",
	icon: MyLogo,
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
