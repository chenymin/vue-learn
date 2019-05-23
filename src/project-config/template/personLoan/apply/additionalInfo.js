const additionalInfo = {
  pageCurrentIndex: 2,
  nextJumpUrl: 'applyFourth',
  preJumpUrl: 'applySecond',
  changeKey: {
    province: 'provinceCode',
    city: 'cityCode',
    area: 'countryCode',
    marriage: 'marriage',
    relationShip1: 'relationShip1',
    relationShip2: 'relationShip2',
    spouseName: 'spouseName',
    spouseIdNo: 'spouseIdNo',
    spouseMobile: 'spouseMobile'
  },
  formData: {
    marriage: null,
    eduLevel: null,
    eduAcademic: null,
    spouseName: null,
    spouseIdType: null,
    spouseIdNo: null,
    spouseMobile: null,
    provincialDetail: null,
    provinceCode: null,
    cityCode: null,
    countryCode: null,
    detailAddress: null,
    contact1: null,
    phone1: null,
    relationShip1: null,
    contact2: null,
    phone2: null,
    relationShip2: null
  },
  schema: [
    {
      fieldType: 'MySelection',
      model: 'eduLevel',
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
      model: 'marriage',
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
        spouseName: null,
        spouseIdNo: null,
        spouseMobile: null
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
          model: 'spouseName'
        },
        {
          fieldType: 'MyInput',
          label: '配偶身份证号',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'spouseIdNo'
        },
        {
          fieldType: 'MyInput',
          label: '配偶手机号',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'spouseMobile'
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
      model: 'detailAddress',
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
        contact1: '',
        phone1: '',
        relationShip1: '',
        contact2: '',
        phone2: '',
        relationShip2: ''
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
          model: 'contact1'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'phone1'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'relationShip1'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'contact2'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'phone2'
        },
        {
          fieldType: 'MyInput',
          label: '紧急联系人信息',
          readonly: true,
          isShowInputLabel: false,
          rules: {
            required: true
          },
          model: 'relationShip2'
        }
      ]
    }
  ]
}
export default additionalInfo
