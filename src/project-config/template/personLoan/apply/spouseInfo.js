const spouseInfo = {
  nextJumpUrl: '',
  preJumpUrl: 'applyThird',
  formData: {
    spouseIdType: '01',
    spouseName: null,
    spouseIdNo: null,
    spouseMobile: null
  },
  schema: [
    {
      fieldType: 'MyInput',
      model: 'spouseName',
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
      model: 'spouseIdNo',
      label: '配偶证件号码',
      placeholder: '已婚必填',
      rules: {
        required: true,
        idCard: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'spouseMobile',
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
