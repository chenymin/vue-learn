const emergencyInfo = {
  nextJumpUrl: '',
  preJumpUrl: 'applyThird',
  changeKey: {
    relationShip1: 'relationShip1',
    relationShip2: 'relationShip2'
  },
  formData: {
    contact1: null,
    phone1: null,
    relationShip1: null,
    contact2: null,
    phone2: null,
    relationShip2: null
  },
  schema: [
    {
      fieldType: 'MyInput',
      model: 'contact1',
      label: '紧急联系人1姓名',
      placeholder: '输入联系人名称 (非申请人)',
      maxlength: 30,
      class: 'component__margin-top',
      inputClass: ['input-component__padding-left'],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'phone1',
      label: '紧急联系人1手机',
      placeholder: '请输入联系人手机号',
      type: 'tel',
      maxlength: 11,
      inputClass: ['input-component__padding-left'],
      rules: {
        required: true,
        phone: true,
        unEqual: 'contact2Phone'
      }
    },
    {
      fieldType: 'MySelection',
      model: 'relationShip1',
      label: '紧急联系人1关系',
      placeholder: '请选择',
      selectType: 'term',
      isShowSelect: false,
      isShowHeaderTitle: false,
      isNeedValue: true,
      readonly: true,
      objKey: 'dataTrsVal',
      objValue: 'dataVal',
      list: [
        {
          'dataVal': '01',
          'dataTrsVal': '配偶',
          delete: true
        },
        {
          'dataVal': '02',
          'dataTrsVal': '父母'
        },
        {
          'dataVal': '03',
          'dataTrsVal': '子女'
        },
        {
          'dataVal': '04',
          'dataTrsVal': '同事'
        },
        {
          'dataVal': '05',
          'dataTrsVal': '朋友'
        },
        {
          'dataVal': '07',
          'dataTrsVal': '工作证明人'
        },
        {
          'dataVal': '08',
          'dataTrsVal': '其他'
        },
        {
          'dataVal': '09',
          'dataTrsVal': '家人'
        },
        {
          'dataVal': '11',
          'dataTrsVal': '兄弟姐妹'
        }
      ],
      inputClass: ['input-component-position_right'],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'contact2',
      label: '紧急联系人2姓名',
      placeholder: '输入联系人名称 (非申请人)',
      maxlength: 30,
      class: 'component__margin-top',
      inputClass: ['input-component__padding-left'],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'phone2',
      ref: 'contact2Phone',
      label: '紧急联系人2手机',
      placeholder: '请输入联系人手机号',
      type: 'tel',
      maxlength: 11,
      inputClass: ['input-component__padding-left'],
      rules: {
        required: true,
        phone: true
      }
    },
    {
      fieldType: 'MySelection',
      model: 'relationShip2',
      label: '紧急联系人2关系',
      placeholder: '请选择',
      selectType: 'term',
      isShowSelect: false,
      isShowHeaderTitle: false,
      isNeedValue: true,
      readonly: true,
      objKey: 'dataTrsVal',
      objValue: 'dataVal',
      list: [
        {
          'dataVal': '01',
          'dataTrsVal': '配偶',
          delete: true
        },
        {
          'dataVal': '02',
          'dataTrsVal': '父母'
        },
        {
          'dataVal': '03',
          'dataTrsVal': '子女'
        },
        {
          'dataVal': '04',
          'dataTrsVal': '同事'
        },
        {
          'dataVal': '05',
          'dataTrsVal': '朋友'
        },
        {
          'dataVal': '07',
          'dataTrsVal': '工作证明人'
        },
        {
          'dataVal': '08',
          'dataTrsVal': '其他'
        },
        {
          'dataVal': '09',
          'dataTrsVal': '家人'
        },
        {
          'dataVal': '11',
          'dataTrsVal': '兄弟姐妹'
        }
      ],
      inputClass: ['input-component-position_right'],
      rules: {
        required: true
      }
    }
  ]
}
export default emergencyInfo
