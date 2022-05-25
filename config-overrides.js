// 此文件是为了ant选择性引入
//const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
  // antd选择性引入
  //config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
 
  // 修改path目录
  const path = require('path');
  const paths = require('react-scripts/config/paths');
  paths.appBuild = path.join(path.dirname(paths.appBuild), 'dist');
  config.output.path = path.join(path.dirname(config.output.path), 'dist');
  console.log(`custom output path - ${config.output.path} `);
  return config;
 };