"use strict";
/*!
 * Module dependencies.
 */

const _ = require('lodash');
const express = require('express');
const router = express.Router();
const request = require('../helpers/request');
const formatters = require('../helpers/formatters');
const aggregators = require('../helpers/aggregators');

/*!
 * Routes.
 */

router.post('/', function(req, res, next) {
  const type = req.body.type;
  const taskNumber = req.body.taskNumber;
  const special = req.body.special;

  let fields = req.body.fields;
  let sortPath = req.body.sortPath;
  let sort = req.body.sort;

  request(req.body.url)
    .then((data) => data.data.children)
    .then((data) => {
      data = data.map((el) => el.data);
      if (taskNumber === '2') {
        sort = 'desc';
        sortPath = 'count';
        fields = ['domain', 'sum', 'count'];
        return aggregators.domainStats(data);
      }
      return data;
    })
    .then((data) => {
      return data.sort((a, b) => {
        let field1 = _.get(a, req.body.sortPath);
        let field2 = _.get(b, req.body.sortPath);
        return sort === 'asc' ? field1 - field2 : field2 - field1;
      });
    })
    .then((data) => {
      data = formatters['json2' + type](data, fields, special);
      res.send(data);
    })
    .catch(next);
});

module.exports = router;
