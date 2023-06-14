module.exports = {
    root: true,
    ignorePatterns: ["node_modules/@mui/system/**"],
    plugins: ['@typescript-eslint', 'import', 'prettier'],
    extends: [
      'airbnb-typescript/base',
      'prettier',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/typescript',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.eslint.json',
    },
    rules: {
        // Other rules...
        "@typescript-eslint/no-unused-expressions": "off",
        // Ignore PascalCase for interface names
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/default-param-last": "off",
        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'interface',
            format: ['camelCase'],
            leadingUnderscore: 'allow',
          },
        ],
      },
      
  };