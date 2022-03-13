const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.config');

productionConfig = {
  mode: 'production'
};

module.exports = merge(commonConfig, productionConfig);
