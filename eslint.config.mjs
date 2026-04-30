import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals.js";
import nextTs from "eslint-config-next/typescript.js";

// eslint-config-next may export a plain object or an array depending on version.
// Normalise both shapes so defineConfig() receives a flat array of config objects.
const toArray = (c) => (Array.isArray(c) ? c : [c]);

const eslintConfig = defineConfig([
  ...toArray(nextVitals),
  ...toArray(nextTs),
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
