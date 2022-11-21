const path = require('path');

module.exports = async ({ config }) => {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@public': path.resolve(__dirname, '../public'),
    '@styles': path.resolve(__dirname, '../src/styles'),
  };
  config.module.rules.push({
    test: /\.(sass|scss)$/,
    use: ['resolve-url-loader'],
    include: path.resolve(__dirname, '../'),
  });
  config.module.rules.push({
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
    ],
    include: path.resolve(__dirname + '../'),
  });
  return config;
};
