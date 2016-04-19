"use strict";
/*!
 * Module dependencies.
 */

const _ = require('lodash');

/*!
 * Expose json2csv.
 */

module.exports.domainStats = function json2sql(arr) {
  const ret = arr.reduce((m, b, c) => {
    const key = _.get(b, 'domain');
    const value = m.has(key) ? m.get(key) : { domain: key, sum: 0, count: 0 };
    value.count++;
    value.sum += b.ups;
    m.set(key, value);
    return m;
  }, new Map).values();

  return [...ret];
};


