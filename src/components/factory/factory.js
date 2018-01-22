import {myInputNoticeVal, mySelectNoticeVal, myDistChangeVal} from './monitorComsEmit'
const components = {}
components.myInput = require('../input.vue')
components.mySelect = require('../selection.vue')
components.myDistPicker = require('../distpickers/distpicker.vue')

const eventOn = {}
eventOn.myInput = myInputNoticeVal
eventOn.mySelect = mySelectNoticeVal
eventOn.myDistPicker = myDistChangeVal

export default {
  name: 'factor',
  props: ['factor'],
  render (h) {
    const createField = (field) => h(
      'div',
      [
        h(
          components[field.type] || field.type,
          {
            props: {
              props: field.props && field.props || {},
              model: field.model && field.model || '',
              province: field.province && field.province || '',
              city: field.city && field.city || '',
              area: field.area && field.area || ''
            },
            on: {
              [field.type]: eventOn[field.type] || ''
            }
          }
        )
      ]
    )
    const createFields = (fields) => fields.map((field) => createField(field))
    return h('div', {attrs: {class: 'factory'}}, createFields(this.factor))
  }
}
