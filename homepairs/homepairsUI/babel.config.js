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
                    root: ['.'],
                    alias: {
                        'homepairs-fonts': './res/fonts',
                        'homepairs-images': './res/images.tsx',
                        'homepairs-strings': './res/strings.tsx',
                        'homepairs-colors': './res/colors.tsx',
                        'homepairs-types': './src/state/types.ts',
                        'homepairs-elements': './src/Elements/index.tsx',
                        'homepairs-redux-actions': './src/state/actions.ts',
                        'homepairs-pages': './src/Screens/index.ts',
                        'homepairs-base-styles': './res/Styles/base.ts',
                        'homepairs-components':
                            './src/Screens/Components/index.tsx',
                        'homepairs-utilities': './src/utility/index.tsx',
                        'homepairs-routes' : './src/Routes/RouteConstants',
                    },
                },
            ],
        ],
        sourceMaps: true,
    };
};
