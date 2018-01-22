export const calRate = (total, yearrate, terms, payfun) => {
  let corpus = parseFloat(total)
  let rates = (parseFloat(yearrate)) / 100 / 12
  let rateMon = parseInt(terms)

  let sbResult = {capTotle: 0, varerestTotle: 0, list: []}
  if (payfun === 'de') {
    sbResult = calculateR(rates, rateMon, corpus)
  } else if (payfun === 'dj') {
    sbResult = calculateC(rates, rateMon, corpus)
  } else if (payfun === 'pf') {
    sbResult = payOff(rates, rateMon, corpus)
  } else if (payfun === 'bm') {
    sbResult = byMonthCalRate(rates, rateMon, corpus)
  }
  return sbResult
}

// 计算等额还款 利率、期限、本金
function calculateR (rates, rateMon, corpus) {
  const obj = {capTotle: 0, varerestTotle: 0, list: []}
  let limitTime = rateMon // 贷款期限
  let timeLeft = limitTime

  let corpusLeft = corpus // 等额还款之本金
  let corpusLeftMon = corpus // 等额还款之剩余本金

  let capMon, corpusMon, varerestMon
  let capTotle = 0
  let corpusTotle = 0
  let varerestTotle = 0

  let rate = rates
  for (let i = 1; i < limitTime; i++) {
    let ratePow = Math.pow(rate + 1, timeLeft)// 每期贷款利率

    capMon = (corpusLeft * rate * ratePow) / (ratePow - 1) // 月供
    varerestMon = corpusLeftMon * rate // 月供利息
    corpusMon = capMon - varerestMon // 月供本金

    corpusLeftMon -= corpusMon // 本金余额
    capTotle += capMon // 还款总额
    varerestTotle += varerestMon // 利息总额
    corpusTotle += corpusMon // 本金总额
    obj.list.push(_.assign({}, {capMon, varerestMon, corpusMon, corpusTotle}))
  }

  // 最后一期
  varerestMon = corpusLeftMon * rate // 月供利息
  corpusMon = corpusLeftMon // 月供本金

  capMon = varerestMon + corpusLeftMon // 月供
  corpusLeftMon -= corpusMon // 本金余额
  capTotle += capMon // 还款总额
  varerestTotle += varerestMon // 利息总额
  corpusTotle += corpusMon // 本金总额

  obj.list.push(_.assign({}, {capMon, varerestMon, corpusMon, corpusTotle}))
  obj.capTotle = (Math.round(capTotle * 100)) / 100
  obj.varerestTotle = (Math.round(varerestTotle * 100)) / 100
  return obj
}

// 计算等额本金
function calculateC (rates, rateMon, corpus) {
  const obj = {capTotle: 0, varerestTotle: 0, list: []}
  let limitTime = rateMon

  let corpusLeftMon = corpus // 等额本金之剩余本金

  let capMon, corpusMon, varerestMon
  let capTotle = 0
  let varerestTotle = 0
  let corpusTotle = 0

  corpusMon = corpus / limitTime
  let rate = rates

  for (let i = 1; i <= limitTime; i++) {
    varerestMon = corpusLeftMon * rate
    capMon = corpusMon + varerestMon
    corpusLeftMon -= corpusMon
    capTotle += capMon
    varerestTotle += varerestMon
    corpusTotle += corpusMon
    obj.list.push({capMon, varerestMon, corpusMon, corpusTotle})
  }

  obj.capTotle = (Math.round(capTotle * 100)) / 100
  obj.varerestTotle = (Math.round(varerestTotle * 100)) / 100
  return obj
}

function payOff (rates, rateMon, corpus) {
  const obj = {capTotle: 0, varerestTotle: 0, list: []}
  const varerestTotle = rates * rateMon * corpus
  const capTotle = corpus + varerestTotle
  obj.capTotle = capTotle
  obj.varerestTotle = varerestTotle
  return obj
}

function byMonthCalRate (rates, rateMon, corpus) {
  const obj = {capTotle: 0, varerestTotle: 0, list: []}
  let corpusTotle = 0
  for (let i = 0; i < rateMon; i++) {
    const varerestMon = rates * corpus
    if (i === rateMon - 1) {
      corpusTotle = corpus
    }
    obj.list.push(_.assign({}, {capMon: 0, varerestMon, corpusMon: 0, corpusTotle: corpusTotle}))
  }
  const varerestTotle = rates * rateMon * corpus
  const capTotle = corpus + varerestTotle
  obj.capTotle = capTotle
  obj.varerestTotle = varerestTotle
  return obj
}
