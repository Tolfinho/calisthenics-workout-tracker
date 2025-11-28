// eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        global: "readonly",
        fetch: "readonly",
      },
    },
    extends: [
      js.configs.recommended,
      pluginVue.configs["flat/recommended"],
    ],
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
]);
