import typescriptEslint from "@typescript-eslint/eslint-plugin";
import jest from "eslint-plugin-jest";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        jest,
        prettier,
    },

    languageOptions: {
        globals: {
            ...globals.commonjs,
            ...globals.node,
            ...jest.environments.globals.globals,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        parser: tsParser,
        ecmaVersion: 10,
        sourceType: "commonjs",
    },

    rules: {
        "prettier/prettier": "warn",
        semi: ["error", "always"],
        "prefer-const": "warn",
        curly: "warn",

        indent: ["warn", 2, {
            SwitchCase: 1,
        }],

        "max-len": ["warn", {
            code: 140,
            tabWidth: 2,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],

        quotes: ["warn", "single"],
        eqeqeq: ["error", "always"],
        radix: ["error", "as-needed"],
        "no-var": "error",
        "no-shadow-restricted-names": "error",
        "no-empty-function": "warn",
        "no-floating-decimal": "error",
        "no-unused-expressions": "warn",
        "no-useless-computed-key": "warn",
        "no-useless-concat": "warn",
        "getter-return": "warn",
        "no-cond-assign": "warn",
        "no-dupe-args": "error",
        "no-dupe-else-if": "error",
        "no-dupe-keys": "error",
        "no-empty": "warn",
        "no-extra-semi": "warn",
        "no-multi-spaces": "warn",
        "block-spacing": "warn",
        "brace-style": "warn",
        "comma-dangle": ["warn", "never"],

        "comma-spacing": ["warn", {
            before: false,
            after: true,
        }],

        "comma-style": ["warn", "last"],
        "func-call-spacing": ["warn", "never"],

        "key-spacing": ["warn", {
            beforeColon: false,
        }],

        "keyword-spacing": ["warn", {
            before: true,
        }],

        "no-multiple-empty-lines": ["warn", {
            max: 1,
            maxEOF: 1,
        }],

        "quote-props": ["warn", "as-needed"],
        "@typescript-eslint/no-var-requires": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "@typescript-eslint/ban-ts-comment": 0,
        "@typescript-eslint/no-non-null-assertion": "off",
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
    },
}];