import Vue from 'vue'

// Helper for creating a new Vue.js
// powered data model instance.
const vueify = ({ data, model }) => {
  const instance = new Vue(model)
  Object.keys(data).forEach(key => {
    // The hash `#` prefix means that
    // this properties should not be
    // modified directly.
    if (typeof instance[`#${key}`] === 'undefined') return
    instance[`#${key}`] = data[key]
  })
  return instance
}

function QueryBuilder ({ model, provider }) {
  this.query = []
  this.model = model
  this.provider = provider
}

QueryBuilder.prototype.where = function (queryParams) {
  this.query.push(queryParams)
  return this
}

QueryBuilder.prototype.first = async function () {
  const data = await this.provider.find(this.query)
  return vueify({ data, model: this.model })
}

QueryBuilder.prototype.all = async function () {
  const response = await this.provider.list()
  return response.map(data => vueify({ data, model: this.model }))
}

QueryBuilder.prototype.get = async function () {
  const response = await this.provider.list(this.query)
  return response.map(data => vueify({ data, model: this.model }))
}

export const makeModel = ({ computed, fields, provider }) => {
  const model = {
    data: () =>
      Object.keys(fields).reduce(
        (prev, key) => ({ ...prev, [`#${key}`]: fields[key].default }),
        {}
      ),
    computed: {
      ...Object.keys(fields).reduce(
        (prev, key) => ({
          ...prev,
          [key] () {
            return this[`#${key}`]
          }
        }),
        {}
      ),
      ...computed
    }
  }
  return new QueryBuilder({ model, provider })
}
