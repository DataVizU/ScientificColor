/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  overrides: [
    {
      files: ["cypress/e2e/**.{cy,spec}.{js,ts,jsx,tsx}"],
      extends: ["plugin:cypress/recommended"],
    },
  ],
};

// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
//   rules: {
//     "no-unused-vars": "off",
//     "vue/no-unused-components": "off",
//     "vue/multi-word-component-names": "off",
//   },
//   parser: "@babel/eslint-parser",
//   parserOptions: {
//     parser: "@babel/eslint-parser",
//     requireConfigFile: false, // <== ADD THIS
//     ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
//     sourceType: "module", // Allows for the use of imports
//     babelOptions: {
//       presets: ["@babel/preset-react"],
//     },
//   },
//   presets: ["@babel/preset-react"],
// };
