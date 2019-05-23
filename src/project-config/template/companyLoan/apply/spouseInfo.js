const spouseInfo = {
  nextJumpUrl: '',
  preJumpUrl: 'applyThird',
  formData: {
    legalSpouseName: null,
    legalSpouseIdNo: null,
    legalSpouseMobile: null,
    spouseIdType: '01'
  },
  schema: [
    {
      fieldType: 'MyInput',
      model: 'legalSpouseName',
      label: '配偶姓名',
      placeholder: '已婚必填',
      maxlength: 30,
      class: 'component__margin-top',
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MySelection',
      model: 'spouseIdType',
      label: '身份证',
      placeholder: '已婚必填',
      selectType: 'term',
      isShowSelect: false,
      isShowHeaderTitle: false,
      isTriggerClick: false,
      isNeedValue: true,
      readonly: true,
      objKey: 'label',
      objValue: 'value',
      list: [
        {
          label: '身份证',
          value: '01'
        }
      ],
      inputClass: ['input-component-position_right'],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'legalSpouseIdNo',
      label: '配偶证件号码',
      placeholder: '已婚必填',
      rules: {
        required: true,
        idCard: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'legalSpouseMobile',
      label: '配偶手机号',
      placeholder: '已婚必填',
      type: 'tel',
      maxlength: 11,
      rules: {
        required: true,
        phone: true
      }
    }
  ]
}
export default spouseInfo
