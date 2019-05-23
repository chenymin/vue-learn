const projectConfig = {
  'slh': {
    // 主题配置路径
    'themeVariables': './src/scss/theme-config-variables/dark',
    // 页面信息配置路径
    'pageConfigInfoPath': './src/project-config/page-config/slh',
    // 路由配置信息
    'routerConfigInfoPath': './src/router/router-config/companyFactoring'
  },
  'mlht': {
    'themeVariables': './src/scss/theme-config-variables/default',
    'pageConfigInfoPath': './src/project-config/page-config/mlht',
    'routerConfigInfoPath': './src/router/router-config/companyLoan'
  },
  'hpk': {
    'themeVariables': './src/scss/theme-config-variables/default',
    'pageConfigInfoPath': './src/project-config/page-config/hpk',
    'routerConfigInfoPath': './src/router/router-config/personalLoan'
  }
}

module.exports = projectConfig
