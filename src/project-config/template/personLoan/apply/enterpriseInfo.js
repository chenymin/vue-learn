const enterpriseInfo = {
  pageCurrentIndex: 1,
  nextJumpUrl: 'applyThird',
  preJumpUrl: 'applyFirst',
  formData: {
    companyName: null,
    businessLicensePeriod: null,
    regNo: null,
    provincialDetail: null,
    actualAddr: null,
    actualProviceCode: '',
    actualCityCode: '',
    actualCountryCode: '',
    businessLicenseStart: '',
    businessLicenseEnd: ''
  },
  changeKey: {
    province: 'actualProviceCode',
    city: 'actualCityCode',
    area: 'actualCountryCode'
  },
  needModifyScheme: [
    {
      model: 'actualAddr',
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
      model: 'companyName',
      label: '企业名称',
      placeholder: '名称必须与营业执照相同',
      rules: {
        required: true
      },
      slotName: 'input-slot',
      componentChildList: [
        {
          fieldType: 'AlertBox',
          message: '目前仅支持药店和诊所的申请 （不包括卫生院）',
          isComponentShow: false,
          model: 'applyEnterpriseNameBox'
        },
        {
          fieldType: 'MyIcon',
          message: '目前仅支持药店和诊所的申请 （不包括卫生院）'
        }
      ]
    },
    {
      fieldType: 'DatePicker',
      model: 'businessLicensePeriod',
      label: '营业执照有效期限',
      datePickType: 'multipleDate',
      rules: {
        required: true,
        dateCompare: true
      },
      inputChild: [
        {
          label: '',
          placeholder: '成立日期',
          readonly: true,
          model: 'startDateValue'
        },
        {
          label: '至',
          placeholder: '有效期',
          readonly: true,
          model: 'endDateValue'
        }
      ]
    },
    {
      fieldType: 'MyInput',
      model: 'regNo',
      label: '企业证件号码',
      placeholder: '统一社会信用代码/组织机构代码',
      inputClass: ['input-component__padding-left'],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'Distpicker',
      label: '实际经营地址',
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
    }
  ]
}
export default enterpriseInfo
