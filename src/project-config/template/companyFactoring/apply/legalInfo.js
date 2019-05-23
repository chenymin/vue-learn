const corporateInfo = {
  pageCurrentIndex: 1,
  nextJumpUrl: 'applyThird',
  preJumpUrl: 'applySecond',
  changeKey: {
    phoneNo: 'legalPersonPhoneNo',
    idPeriod: 'legalPersonIdPeriod',
    idIsPermanent: 'legalPersonIdIsPermanent'
  },
  formData: {
    legalPersonName: null,
    legalPersonIdNo: null,
    legalPersonIdPeriod: null,
    legalPersonIdIsPermanent: '02',
    legalPersonCardNo: null,
    legalPersonBankCode: null,
    legalPersonPhoneNo: null,
    smsCode: null
  },
  needModifyScheme: [
    {
      model: 'legalPersonName',
      disabled: true
    },
    {
      model: 'legalPersonIdNo',
      disabled: true
    },
    {
      model: 'legalPersonCardNo',
      disabled: true
    },
    {
      model: 'legalPersonPhoneNo',
      disabled: true
    },
    {
      model: 'legalPersonIdPeriod',
      isTriggerClick: false
    },
    {
      model: 'legalPersonBankCode',
      isTriggerClick: false
    },
    {
      model: 'smsCode',
      isComponentShow: true
    }
  ],
  schema: [
    {
      fieldType: 'MyInput',
      model: 'legalPersonName',
      label: '法定代表人姓名',
      placeholder: '企业法定代表人姓名',
      maxlength: 30,
      inputClass: ['input-component__padding-left'],
      rules: {
        required: true,
        chineseAndLetter: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'legalPersonIdNo',
      label: '身份证号',
      placeholder: '企业法定代表人身份证号码',
      rules: {
        required: true,
        idCard: true
      }
    },
    {
      fieldType: 'DatePicker',
      model: 'legalPersonIdPeriod',
      label: '身份证有效期',
      placeholder: '请设置有效期限',
      readonly: true,
      rules: {
        required: true,
        cardDate: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'legalPersonCardNo',
      label: '银行卡号',
      placeholder: '法定代表人本人的借记卡号',
      maxlength: 20,
      class: 'component__margin-top',
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MySelection',
      model: 'legalPersonBankCode',
      label: '开户行',
      placeholder: '请选择开户行',
      selectType: 'term',
      isShowSelect: false,
      isNeedValue: true,
      readonly: true,
      objKey: 'bankName',
      objValue: 'bankType',
      list: [
        {
          bankName: '工商银行',
          bankType: '01'
        },
        {
          bankName: '招商银行',
          bankType: '02'
        }
      ],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'legalPersonPhoneNo',
      label: '预留手机号',
      placeholder: '请输入此卡银行预留手机号',
      type: 'tel',
      maxlength: 11,
      rules: {
        required: true,
        phone: true
      }
    },
    {
      fieldType: 'SmsCode',
      interfaceUrl: '/entLimit/sendSmsValidate',
      model: 'smsCode',
      label: '验证码',
      placeholder: '请输入短信验证码',
      isSendDisable: false,
      isComponentShow: false,
      maxlength: 6,
      rules: {
        required: true
      }
    }
  ]
}
export default corporateInfo
