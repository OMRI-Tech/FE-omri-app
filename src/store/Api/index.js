const { default: Get } = require('./Get')
const { default: Post } = require('./Post')
const { default: Delete } = require('./Delete')
const { default: Select2 } = require('./Select2')
const { default: Notifica } = require('./Notifica')

const Request = {
  Get,
  Post,
  Delete,
  Select2
}

const Utils = {
  Notifica
}

const Model = (model) => {
  const { default: Model } = require(`./models/${model}.js`)
  return Model(model.toLowerCase())
}

export {
  Request,
  Utils,
  Model
}
