const path = require('path')

module.exports = {
  stories: ['../src/**/*.stories.tsx'],
  addons: [
    // '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs'
  ],
  webpackFinal: async config => {

    // config.module.rules.push({
    //   test: /\.(ts|tsx)$/,
    //   use: [
    //     {
    //       loader: require.resolve("react-docgen-typescript-loader"),
    //       options: {
    //         shouldExtractLiteralValuesFromEnum: true,
    //         propFilter: (prop) => {
    //           if (prop.parent) {
    //             return !prop.parent.fileName.includes('node_modules')
    //           }
    //           return true
    //         }
    //       }
    //     }
    //   ]
    // });
    config.module.rules.push({
      test: /\.(scss)$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src')
    },);
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
