module.exports = {
  plugins: [
    "import",
  ],
  "env": {
    "browser": true,
    "es6": true,
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly",
    "Deno": "readonly",
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module",
    "allowImportExportEverywhere": true,
  },
  "rules": {
    "no-unused-vars": "off",
    "import/extensions": ["error", "ignorePackages", {
      js: "always",
    }],
  },
  "settings": {
    "import/extensions": [
      ".js",
    ],
  },
};
