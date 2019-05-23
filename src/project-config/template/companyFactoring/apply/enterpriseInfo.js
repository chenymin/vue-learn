const enterpriseInfo = {
  pageCurrentIndex: 0,
  nextJumpUrl: 'applySecond',
  preJumpUrl: 'noApply',
  changeKey: {
    province: 'province',
    city: 'city',
    area: 'area'
  },
  formData: {
    appAmt: 100,
    validityPeriod: 12,
    companyName: null,
    regNo: null,
    provincialDetail: null,
    actualAddr: null,
    companyBankName: null,
    companyAccount: null
  },
  needModifyScheme: [
    {
      model: 'actualAddr',
      disabled: true
    },
    {
      model: 'companyBankName',
      disabled: true
    },
    {
      model: 'companyAccount',
      disabled: true
    },
    {
      model: 'provincialDetail',
      isTriggerClick: false
    }
  ],
  schema: [
    {
      fieldType: 'MyInput',
      model: 'appAmt',
      label: '申请额度 (元)',
      placeholder: '1-100万',
      class: 'input-component__input-position_small',
      disabled: true,
      rules: {
        required: true,
        between: {
          min: 1,
          max: 100
        }
      },
      unit: '万'
    },
    {
      fieldType: 'MyInput',
      model: 'validityPeriod',
      label: '额度有效期',
      unit: '个月',
      class: 'input-component__input-position',
      disabled: true
    },
    {
      fieldType: 'MyInput',
      model: 'companyName',
      label: '企业名称',
      placeholder: '名称必须与营业执照相同',
      class: 'component__margin-top',
      rules: {
        required: true
      },
      slotName: 'input-slot',
      componentChildList: [
        {
          fieldType: 'AlertBox',
          message: '名称必须与营业执照相同',
          isComponentShow: false,
          model: 'applyEnterpriseNameBox'
        },
        {
          fieldType: 'MyIcon',
          message: '名称必须与营业执照相同'
        }
      ]
    },
    {
      fieldType: 'MyInput',
      model: 'regNo',
      label: '统一社会信用代码',
      placeholder: '请输入统一社会信用代码',
      inputClass: ['input-component__padding-left'],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'Distpicker',
      label: '企业实际经营地址',
      placeholder: '请选择省市区',
      model: 'provincialDetail',
      readonly: true,
      isTriggerClick: true,
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'actualAddr',
      label: '详细地址',
      placeholder: '如道路、门牌号等',
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'companyBankName',
      label: '企业账户开户行',
      placeholder: '请输入企业账户开户行',
      inputClass: ['input-component__padding-left'],
      rules: {
        required: false
      }
    },
    {
      fieldType: 'MyInput',
      model: 'companyAccount',
      label: '企业账户号',
      placeholder: '请输入企业账户号码',
      rules: {
        required: false
      }
    }
  ]
}
export default enterpriseInfo
