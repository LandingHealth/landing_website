import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import svelte from "eslint-plugin-svelte";
import ts from "typescript-eslint";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  ...svelte.configs.base,
  {
    files: ["**/*.svelte", "**/*.svelte.ts"],
    languageOptions: { parserOptions: { parser: ts.parser, extraFileExtensions: [".svelte"] } },
  },
  {
    files: ["**/*.{ts,tsx,svelte}"],
    ignores: ["src/lib/motion/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/vendor/**"],
              message: "Vendor components are imported only by the wrappers in src/lib/motion, which apply brand colors and the motion rules.",
            },
          ],
        },
      ],
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "src/lib/vendor/**"]),
]);
