const merge = require('webpack-merge');
const commonConfig = require('./webpack.config');

const developmentConfig = {
  mode: 'development'
};

module.exports = merge(commonConfig, developmentConfig);
