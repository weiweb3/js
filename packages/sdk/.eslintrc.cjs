module.exports = {
  root: true,
  extends: ["weiweb3"],
  rules: {
    "import/no-cycle": "off",
  },
  // allow all imports from within tests
  overrides: [
    {
      files: "./test/**/*",
      rules: {
        "@typescript-eslint/no-restricted-imports": "off",
      },
    },
  ],
};
