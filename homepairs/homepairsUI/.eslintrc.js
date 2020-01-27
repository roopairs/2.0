module.exports = {
    'root' : true,
    'extends': ['airbnb-typescript', 'prettier', 'prettier/@typescript-eslint', 'prettier/react'],
    'env': {
      'jest': true,
    },
    'rules': {
      'no-use-before-define': 'off',
      'react/jsx-filename-extension': 'off',
      'react/prop-types': 'off',
      'comma-dangle': 'off',
    },
    'globals': {
      "fetch": false
    }
  }