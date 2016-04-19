"use strict";
/*!
 * Module dependencies.
 */

const http = require('http');
const https = require('https');
const parse = require('url').parse;

/*!
 * Expose request.
 */

module.exports = function (url) {
  return new Promise((resolve, reject) => {
    const options = parse(url);
    const proto = options.protocol === 'https:' ? https : http;
    const req = proto.request(options, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    });
    req.on('error', reject);
    req.end();
  })
};
