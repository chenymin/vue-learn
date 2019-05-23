const corporateInfo = {
  pageCurrentIndex: 0,
  nextJumpUrl: 'applySecond',
  preJumpUrl: '',
  changeKey: {
    phoneNo: 'phoneNo',
    idPeriod: 'idPeriod',
    idIsPermanent: 'idIsPermanent'
  },
  formData: {
    appAmt: 100,
    validityPeriod: 12,
    custName: null,
    idNo: null,
    idPeriod: null,
    idIsPermanent: '02',
    cardNo: null,
    bankCode: null,
    phoneNo: null,
    smsCode: null,
    creditUserName: null,
    creditPwd: null,
    creditVerifyCode: null
  },
  needModifyScheme: [
    {
      model: 'custName',
      disabled: true
    },
    {
      model: 'idNo',
      disabled: true
    },
    {
      model: 'cardNo',
      disabled: true
    },
    {
      model: 'legalPersonPhoneNo',
      disabled: true
    },
    {
      model: 'idPeriod',
      isTriggerClick: false
    },
    {
      model: 'bankCode',
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
      model: 'appAmt',
      label: '申请额度 (元)',
      placeholder: '1-100万',
      class: 'input-component__input-position_small',
      inputClass: ['input-component-position_right'],
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
      inputClass: ['input-component-position_right'],
      disabled: true
    },
    {
      fieldType: 'MyInput',
      model: 'custName',
      label: '申请人姓名',
      placeholder: '企业法定代表人或占股20%…',
      maxlength: 30,
      class: 'component__margin-top',
      inputClass: ['input-component__hidden-box'],
      rules: {
        required: true,
        chineseAndLetter: true
      },
      slotName: 'input-slot',
      componentChildList: [
        {
          fieldType: 'AlertBox',
          message: '企业法定代表人或占股20%以上股东或负责人（负责人需提供加盟协议）',
          isComponentShow: false,
          model: 'applyNameBox'
        },
        {
          fieldType: 'MyIcon',
          message: '企业法定代表人或占股20%以上股东或负责人（负责人需提供加盟协议）'
        }
      ]
    },
    {
      fieldType: 'MyInput',
      model: 'idNo',
      label: '身份证号',
      placeholder: '企业法定代表人身份证号码',
      rules: {
        required: true,
        idCard: true
      }
    },
    {
      fieldType: 'DatePicker',
      model: 'idPeriod',
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
      model: 'cardNo',
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
      model: 'bankCode',
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
      model: 'phoneNo',
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
    },
    {
      fieldType: 'RouterLink',
      isShowArrow: true
    },
    {
      fieldType: 'MyInput',
      model: 'creditUserName',
      label: '账户登录名',
      placeholder: '请输入账户登录名 (选填)'
    },
    {
      fieldType: 'MyInput',
      model: 'creditPwd',
      label: '账户密码',
      placeholder: '请输入账户密码 (选填)'
    },
    {
      fieldType: 'MyInput',
      model: 'creditVerifyCode',
      label: '账户身份验证码',
      placeholder: '请输入账户身份验证码 (选填)',
      inputClass: ['input-component__padding-left']
    },
    {
      fieldType: 'MyLabel'
    }
  ]
}
export default corporateInfo
