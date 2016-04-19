"use strict";
/*!
 * Module dependencies.
 */

const _ = require('lodash');

/*!
 * Expose json2csv.
 */

module.exports.json2sql = function json2sql(arr, fields, tableName) {
  const columTypes = fields.map(el => el.name + ' ' + el.type);
  const columns = fields.map(el => el.name);
  const values = arr.map((el) => {
    const value = fields.map(field => `'${_.get(el, field.path, field.default)}'`);
    return `\r\n(${value})`;
  });

  return `CREATE TABLE ${tableName} (${columTypes});\r\nINSERT INTO ${tableName} (${columns}) VALUES ${values};`;
};

/*!
 * Expose json2sql.
 */

module.exports.json2csv = function json2csv(arr, fields, del) {
  del = del || ';';
  const ret = arr.map((el) => {
    return fields.map((path) => {
      const def = path && path['default'];
      path = typeof path === 'string' ? path : path.path;
      return _.get(el, path, def);
    }).join(del);
  });

  ret.unshift(fields.map((path) => path.name || path.path || path).join(del));

  return ret.join("\r\n");
};

