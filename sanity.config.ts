"use client";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { MyLogo } from "./components/globalcomponents/my-logo";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { lowercasePlugin } from "./sanity/schemas/documentHooks";
import { schema } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
// import {media} from ""
export default defineConfig({
	name: "Platinum-Fashion-Hub",
	icon: MyLogo,
	basePath: "/admin",
	projectId,
	dataset,
	schema,
	plugins: [
		structureTool({ structure }),
		visionTool({ defaultApiVersion: apiVersion }),
		lowercasePlugin,
		media({
			creditLine: {
				enabled: true,
				excludeSources: ["unsplash"],
			},
			maximumUploadSize: 10000000,
		}),
	],
	form: {
		image: {
			assetSources: (previousAssetSources) => {
				return previousAssetSources.filter(
					(assetSource) => assetSource !== mediaAssetSource
				);
			},
		},
		file: {
			assetSources: (previousAssetSources) => {
				return previousAssetSources.filter(
					(assetSource) => assetSource !== mediaAssetSource
				);
			},
		},
	},
});
