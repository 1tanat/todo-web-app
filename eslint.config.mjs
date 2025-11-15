import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    files: ["**/*.{js,jsx}"],
    ignores: ["node_modules", "dist"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: { jsx: true },
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    settings: {
      react: { version: "detect" },
    },

    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // JSX не требует import React
      "react/react-in-jsx-scope": "off",

      // не нужна проверка PropTypes
      "react/prop-types": "off",
    },
  },
];
