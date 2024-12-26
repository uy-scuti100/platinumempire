"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var node_fetch_1 = require("node-fetch");
var path_1 = require("path");
// Load environment variables from .env.local
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), ".env.local") });
var statesData = [
    { name: "Abia", zone: "East", price: 500 },
    { name: "Adamawa", zone: "North", price: 800 },
    { name: "Akwa Ibom", zone: "South", price: 600 },
    { name: "Anambra", zone: "East", price: 500 },
    { name: "Bauchi", zone: "North", price: 800 },
    { name: "Bayelsa", zone: "South", price: 600 },
    { name: "Benue", zone: "North", price: 700 },
    { name: "Borno", zone: "North", price: 800 },
    { name: "Cross River", zone: "South", price: 600 },
    { name: "Delta", zone: "South", price: 600 },
    { name: "Ebonyi", zone: "East", price: 500 },
    { name: "Edo", zone: "South", price: 600 },
    { name: "Ekiti", zone: "West", price: 400 },
    { name: "Enugu", zone: "East", price: 500 },
    { name: "Gombe", zone: "North", price: 800 },
    { name: "Imo", zone: "East", price: 500 },
    { name: "Jigawa", zone: "North", price: 700 },
    { name: "Kaduna", zone: "North", price: 700 },
    { name: "Kano", zone: "North", price: 700 },
    { name: "Katsina", zone: "North", price: 700 },
    { name: "Kebbi", zone: "North", price: 700 },
    { name: "Kogi", zone: "North", price: 700 },
    { name: "Kwara", zone: "North", price: 700 },
    { name: "Lagos", zone: "West", price: 400 },
    { name: "Nasarawa", zone: "North", price: 700 },
    { name: "Niger", zone: "North", price: 700 },
    { name: "Ogun", zone: "West", price: 400 },
    { name: "Ondo", zone: "West", price: 400 },
    { name: "Osun", zone: "West", price: 400 },
    { name: "Oyo", zone: "West", price: 400 },
    { name: "Plateau", zone: "North", price: 700 },
    { name: "Rivers", zone: "South", price: 600 },
    { name: "Sokoto", zone: "North", price: 700 },
    { name: "Taraba", zone: "North", price: 800 },
    { name: "Yobe", zone: "North", price: 800 },
    { name: "Zamfara", zone: "North", price: 700 },
];
// Validate environment variables
var requiredEnvVars = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
        process.env.SANITY_STUDIO_PROJECT_ID,
    SANITY_STUDIO_TOKEN: process.env.SANITY_STUDIO_TOKEN,
    SANITY_API_VERSION: process.env.SANITY_API_VERSION || "2024-12-15",
    SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET ||
        process.env.NEXT_PUBLIC_SANITY_DATASET ||
        "production",
};
// Check for missing environment variables
var missingVars = Object.entries(requiredEnvVars)
    .filter(function (_a) {
    var _ = _a[0], value = _a[1];
    return !value;
})
    .map(function (_a) {
    var key = _a[0];
    return key;
});
if (missingVars.length > 0) {
    console.error("Missing required environment variables:", missingVars.join(", "));
    process.exit(1);
}
// Construct the Sanity URL
var sanityUrl = "https://".concat(requiredEnvVars.NEXT_PUBLIC_SANITY_PROJECT_ID, ".api.sanity.io/v").concat(requiredEnvVars.SANITY_API_VERSION, "/data/mutate/").concat(requiredEnvVars.SANITY_STUDIO_DATASET);
function seedStates() {
    return __awaiter(this, void 0, void 0, function () {
        var mutations, response, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    console.log("Starting seeding process...");
                    console.log("Using Sanity URL:", sanityUrl);
                    console.log("Project ID:", requiredEnvVars.NEXT_PUBLIC_SANITY_PROJECT_ID);
                    console.log("Dataset:", requiredEnvVars.SANITY_STUDIO_DATASET);
                    mutations = statesData.map(function (state) { return ({
                        create: {
                            _type: "state",
                            name: state.name,
                            zone: state.zone,
                            price: state.price,
                        },
                    }); });
                    return [4 /*yield*/, (0, node_fetch_1.default)(sanityUrl, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(requiredEnvVars.SANITY_STUDIO_TOKEN),
                            },
                            body: JSON.stringify({ mutations: mutations }),
                        })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    result = (_a.sent());
                    if (response.ok) {
                        console.log("✅ Seeding completed successfully");
                        console.log("Results:", result);
                    }
                    else {
                        console.error("❌ Error seeding data:", result);
                        console.error("Status:", response.status);
                        console.error("Status Text:", response.statusText);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("❌ Error during seeding:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// Run seeding
seedStates();
