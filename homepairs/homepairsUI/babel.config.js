module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
            '.web.js',
            '.web.tsx',
          ],
          root: ['./src'],
          alias: {
            "homepair-fonts": "./res/fonts",
            "homepair-images": "./res/images.tsx",
            "homepair-strings": "./res/strings.tsx",
            "homepair-colors": "./res/colors.tsx",
            "homepair-types": "./src/state/types.ts",
            "homepair-elements": "./src/Elements/index.tsx",
            "homepair-redux-actions": "./src/state/actions.ts",
            "homepair-pages": "./src/Screens/index.ts",
            "homepair-base-styles": "./res/Styles/base.ts",
            "homepair-components": "./src/Screens/Components/index.tsx",
            "homepair-helpers": "./src/utility/index.tsx",
          }
        }
      ]
    ],
    "sourceMaps": true,
  };
};
