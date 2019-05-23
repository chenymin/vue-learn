const uploadInfo = {
  pageCurrentIndex: 3,
  nextJumpUrl: 'applyComplete',
  preJumpUrl: 'applySecond',
  typeObj: {
    '11': 'idCardNum',
    '12': 'idCardNum',
    '04': 'businessLicense',
    '10': 'enterpriseSpecial',
    '09': 'other'
  },
  formData: {
    idCardNum: [],
    businessLicense: [],
    enterpriseSpecial: [],
    other: []
  },
  displayDetailInfo: [
    {
      label: '法定代表人身份证明',
      model: 'idCardNum',
      needNum: 2,
      render: (h, { value, column, index }) => {
        const {needNum} = column
        const textStr = needNum === value.length ? '已完成' : '未完成'
        return h('router-link', {
          'class': {
            'right-text': true,
            'right-text_margin': true,
            'txt-color': needNum === value.length
          },
          props: {
            to: {
              name: 'uploaddetail',
              params: {
                'whichPage': '1',
                'title': '法定代表人身份证明',
                'imgList': value
              }
            }
          }
        }, [textStr, h('span', {
          'class': {
            'arrow-right': true
          }
        })
        ])
      }
    },
    {
      label: '企业一般经营资质证明',
      model: 'businessLicense',
      needNum: 1,
      render: (h, { value, column, index }) => {
        const {needNum} = column
        const textStr = value.length === needNum ? '已完成' : '未完成'
        return h('router-link', {
          'class': {
            'right-text': true,
            'right-text_margin': true,
            'txt-color': value.length === needNum
          },
          props: {
            to: {
              name: 'uploaddetail',
              params: {
                'whichPage': '2',
                'title': '企业一般经营资质证明',
                'imgList': value
              }
            }
          }
        }, [textStr, h('span', {
          'class': {
            'arrow-right': true
          }
        })
        ])
      }
    },
    {
      label: '企业特许经营资质证明',
      model: 'enterpriseSpecial',
      needNum: 2,
      render: (h, { value, column, index }) => {
        const {needNum} = column
        const textStr = value.length >= needNum ? '已完成' : '未完成'
        return h('router-link', {
          'class': {
            'right-text': true,
            'right-text_margin': true,
            'txt-color': value.length >= needNum
          },
          props: {
            to: {
              name: 'uploaddetail',
              params: {
                'whichPage': '3',
                'title': '企业特许经营资质证明',
                'imgList': value
              }
            }
          }
        }, [textStr, h('span', {
          'class': {
            'arrow-right': true
          }
        })
        ])
      }
    },
    {
      label: '其他',
      model: 'other',
      needNum: 1,
      render: (h, { value, column, index }) => {
        const {needNum} = column
        const textStr = value.length >= needNum ? '已完成' : '未完成'
        return h('router-link', {
          'class': {
            'right-text': true,
            'right-text_margin': true,
            'txt-color': value.length >= needNum
          },
          props: {
            to: {
              name: 'uploaddetail',
              params: {
                'whichPage': '4',
                'title': '其他',
                'imgList': value
              }
            }
          }
        }, [textStr, h('span', {
          'class': {
            'arrow-right': true
          }
        })
        ])
      }
    }
  ],
  selectionCard: {
    props: {
      title: '',
      defaultVal: '',
      objKey: 'fileName',
      objValue: 'contractUrl',
      list: [],
      placeholder: '银行卡开户行',
      isShowInput: false,
      isShowHeaderTitle: false,
      selectType: 'url'
    },
    model: ''
  }
}
export default uploadInfo
