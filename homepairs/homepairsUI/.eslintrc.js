module.exports = {
    'root' : true,
    'parser' : '@typescript-eslint/parser',//"babel-eslint", "@typescript-eslint/parser"
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module",
      "ecmaFeatures": {
        "modules": true
      }
    },
    'extends': ['airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react', "plugin:import/errors", "plugin:import/warnings"],
    'env': {
      'jest': true,
    },
    "settings": {
      "import/resolver": {
        "babel-module": {}
      }
    },
    'rules': {
      'no-use-before-define': 0,
      'react/jsx-filename-extension': 0,
      'react/prop-types': 2,
      'comma-dangle': 2,
      'semi': [2, "always"],
      "react/require-default-props": [1, { forbidDefaultForRequired: true, ignoreFunctionalComponents: true }]
    },
    'globals': {
      "fetch": false
    }
  }