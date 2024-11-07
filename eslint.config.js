import pluginVue from "eslint-plugin-vue";
import parserVue from "vue-eslint-parser";
import tseslint from "typescript-eslint";
import pluginVitest from "@vitest/eslint-plugin";
import pluginCypress from "eslint-plugin-cypress/flat";
import skipFormatting from "@vue/eslint-config-prettier/skip-formatting";

export default [
  ...pluginVue.configs["flat/recommended"],
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: tseslint.parser,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  {
    name: "app/files-to-lint",
    files: ["**/*.{ts,mts,tsx,vue}"],
  },

  {
    name: "app/files-to-ignore",
    ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**"],
  },

  {
    ...pluginVitest.configs.recommended,
    files: ["src/**/__tests__/*"],
  },

  {
    ...pluginCypress.configs.recommended,
    files: [
      "cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}",
      "cypress/support/**/*.{js,ts,jsx,tsx}",
    ],
  },
  skipFormatting,

  {
    rules: {
      "vue/multi-word-component-names": "off", // 允许单个单词组件名
      "@typescript-eslint/no-empty-object-type": "off", // 允许声明空对象
      "@typescript-eslint/no-explicit-any": "off", // 允许声明 any
      "@typescript-eslint/no-unused-vars": [
        // 未使用变量警告
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
];
