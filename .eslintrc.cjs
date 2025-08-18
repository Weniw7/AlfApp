module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  env: { browser: true, node: true, es2022: true },
  settings: { react: { version: "detect" } },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
};