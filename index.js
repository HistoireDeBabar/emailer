require('babel-core/register');
require('babel-polyfill');
const handler = require('./src/index.js');
/**
 * Handler called by lambda.
 */
exports.handler = handler.handle;
