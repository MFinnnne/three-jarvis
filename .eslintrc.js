module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
        sourceType: "module"
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
        "@typescript-eslint/consistent-type-definitions": ["error", "type"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "@typescript-eslint/no-empty-function": ["off"],
    }
};
