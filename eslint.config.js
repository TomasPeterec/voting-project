const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const typescript = require("@typescript-eslint/eslint-plugin");
const importPlugin = require("eslint-plugin-import");

module.exports = [
  {
    ignores: ["*.svg", "*.jpg", "*.jpeg", "*.html", "*.css"], // Ignore certain files
  },
  {
    files: ["**/*.js", "**/*.ts", "**/*.jsx", "**/*.tsx"],
    parser: require("@typescript-eslint/parser"),
    parserOptions: {
      ecmaVersion: 2021,        // ECMAScript version
      sourceType: "module",     // Use modules (import/export)
      ecmaFeatures: {
        jsx: true,              // Enable JSX support
      },
      project: "./tsconfig.json", // Path to tsconfig.json
    },
    plugins: [
      "react",
      "react-hooks",
      "@typescript-eslint",
      "import",
      "prettier", // Prettier plugin for ESLint
    ],
    extends: [
      "plugin:react/recommended",              // React linting rules
      "plugin:@typescript-eslint/recommended", // TypeScript linting rules
      "prettier",                              // Disables conflicting rules between Prettier and ESLint
      "plugin:prettier/recommended",           // Integrates Prettier linting
    ],
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "no-console": "off",
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-vars": "error",
      quotes: ["error", "single"],             // Enforce single quotes
      semi: ["error", "always"],               // Enforce semicolons
      indent: ["error", 2],                    // Enforce 2 spaces for indentation
      "@typescript-eslint/no-var-requires": "off",
      "import/no-unresolved": [
        "error",
        {
          ignore: ["^@components/", "^@utils/", "^@contexts/"],
        },
      ],
      "prettier/prettier": "error",             // Treat Prettier violations as errors
    },
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json", // Ensure correct TypeScript resolution
        },
      },
    },
  },
];
