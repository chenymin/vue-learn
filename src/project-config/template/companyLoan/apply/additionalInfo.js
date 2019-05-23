const additionalInfo = {
  pageCurrentIndex: 2,
  nextJumpUrl: 'applyFourth',
  preJumpUrl: 'applySecond',
  changeKey: {
    province: 'legalNativeProvince',
    city: 'legalNativeCity',
    area: 'legalNativeCounty',
    marriage: 'legalMarriage',
    relationShip1: 'legalRelationship1',
    relationShip2: 'legalRelationship2',
    spouseName: 'legalSpouseName',
    spouseIdNo: 'legalSpouseIdNo',
    spouseMobile: 'legalSpouseMobile'
  },
  formData: {
    legalMarriage: null,
    legalEduLevel: null,
    legalEduAcademic: null,
    legalSpouseName: null,
    spouseIdType: null,
    legalSpouseIdNo: null,
    legalSpouseMobile: null,
    provincialDetail: null,
    legalNativeProvince: null,
    legalNativeCity: null,
    legalNativeCounty: null,
    legalNativePlace: null,
    legalContact1: null,
    legalPhone1: null,
    legalRelationship1: null,
    legalContact2: null,
    legalPhone2: null,
    legalRelationship2: null
  },
  schema: [
    {
      fieldType: 'MySelection',
      model: 'legalEduLevel',
      label: '担保人最高学历',
      placeholder: '请选择担保人最高学历',
      selectType: 'term',
      isShowSelect: false,
      isNeedValue: true,
      isShowHeaderTitle: false,
      readonly: true,
      objKey: 'dataTrsVal',
      objValue: 'dataVal',
      inputClass: ['input-component-position_right'],
      list: [
        {
          'dataVal': '01',
          'dataTrsVal': '研究生及以上'
        },
        {
          'dataVal': '02',
          'dataTrsVal': '本科'
        },
        {
          'dataVal': '03',
          'dataTrsVal': '大专'
        },
        {
          'dataVal': '04',
          'dataTrsVal': '高中'
        },
        {
          'dataVal': '05',
          'dataTrsVal': '初中及以下'
        }
      ],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MySelection',
      model: 'eduAcademic',
      label: '担保人最高学位',
      placeholder: '请选择担保人最高学位',
      selectType: 'term',
      isShowSelect: false,
      isNeedValue: true,
      readonly: true,
      isShowHeaderTitle: false,
      objKey: 'dataTrsVal',
      objValue: 'dataVal',
      inputClass: ['input-component-position_right'],
      list: [
        {
          'dataVal': '01',
          'dataTrsVal': '学士'
        },
        {
          'dataVal': '02',
          'dataTrsVal': '硕士'
        },
        {
          'dataVal': '03',
          'dataTrsVal': '博士及以上'
        },
        {
          'dataVal': '04',
          'dataTrsVal': '名誉博士'
        },
        {
          'dataVal': '05',
          'dataTrsVal': '其他'
        }
      ],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MySelection',
      model: 'legalMarriage',
      label: '担保人婚姻状况',
      placeholder: '请选择担保人婚姻状况',
      selectType: 'term',
      isShowSelect: false,
      isNeedValue: true,
      readonly: true,
      isShowHeaderTitle: false,
      objKey: 'dataTrsVal',
      objValue: 'dataVal',
      inputClass: ['input-component-position_right'],
      class: 'component__margin-top',
      list: [
        { dataTrsVal: '未婚', dataVal: '03' },
        { dataTrsVal: '离异', dataVal: '04' },
        { dataTrsVal: '其他', dataVal: '05' },
        { dataTrsVal: '丧偶', dataVal: '06' },
        { dataTrsVal: '已婚', dataVal: '20' }
      ],
      rules: {
        required: true
      }
    },
    {
      fieldType: 'LinkRelitive',
      label: '配偶信息',
      linkText: '添加',
      routerName: 'applySpouse',
      model: 'spouseInfo',
      isComponentShow: true,
      routerLinkComponentClass: ['router-link-component__bg_white'],
      routerLinkComponentLinkClass: ['router-link-component__link_block'],
      slotName: 'linkRelitive',
      formData: {
        legalSpouseName: null,
        legalSpouseIdNo: null,
        legalSpouseMobile: null
      },
      linkList: [
        {
          fieldType: 'MyInput',
          label: '配偶姓名',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalSpouseName'
        },
        {
          fieldType: 'MyInput',
          label: '配偶身份证号',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalSpouseIdNo'
        },
        {
          fieldType: 'MyInput',
          label: '配偶手机号',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalSpouseMobile'
        }
      ]
    },
    {
      fieldType: 'Distpicker',
      label: '担保人联系地址',
      placeholder: '请选择省市区',
      model: 'provincialDetail',
      readonly: true,
      isTriggerClick: true,
      inputClass: ['input-component-position_right'],
      class: 'component__margin-top',
      rules: {
        required: true
      }
    },
    {
      fieldType: 'MyInput',
      model: 'legalNativePlace',
      label: '详细地址',
      placeholder: '如道路、门牌号等',
      rules: {
        required: true
      }
    },
    {
      fieldType: 'LinkRelitive',
      label: '紧急联系人信息',
      linkText: '添加',
      routerName: 'applyEmergency',
      model: 'emergencyInfo',
      routerLinkComponentClass: ['router-link-component__bg_white'],
      routerLinkComponentLinkClass: ['router-link-component__link_block'],
      class: 'component__margin-top',
      isComponentShow: false,
      slotName: 'linkRelitive',
      params: {},
      formData: {
        legalContact1: '',
        legalPhone1: '',
        legalRelationship1: '',
        legalContact2: '',
        legalPhone2: '',
        legalRelationship2: ''
      },
      linkList: [
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalContact1'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalPhone1'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalRelationship1'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalContact2'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalPhone2'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'legalRelationship2'
        }
      ]
    }
  ]
}
export default additionalInfo
