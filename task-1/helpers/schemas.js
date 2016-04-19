
module.exports.proxy = {
  sortPath: {
    type: 'string',
    required: true,
    dependencies: 'sort'
  },
  sort: {
    type: 'string',
    required: true,
    dependencies: 'sortPath'
  },
  type: {
    enum: ['csv', 'sql'],
    required: true
  },
  fields: {
    type: 'array',
    required: true
  }
}
