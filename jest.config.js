export default {
	transform: {
		"^.+\\.(t|j)sx?$": ["@swc/jest"],
	},
	testEnvironment: "jsdom",
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
		"\\.(css|scss|sass)$": "identity-obj-proxy",
	},
	extensionsToTreatAsEsm: [".ts", ".tsx"],
	testPathIgnorePatterns: [".spec.ts$"],
}
