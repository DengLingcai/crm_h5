export function OrderData (id, src, spec, batchNum, lalanNum, speed, holeCount, level,
  weight, price, deliveryID, option, priceVos, minPrice, gradeName, low, store, amount, priceVo, status, invoiceNumbers, application, packageNumber, fobPrice, batchNumbers, kpein) {
  this.id = id
  this.src = src // 图片地址
  this.spec = spec // 规格
  this.bacthNum = batchNum // 批号
  this.lalanNum = lalanNum // 罗拉旦数
  this.speed = speed // 转速
  this.holeCount = holeCount // 孔数
  this.level = level // 等级
  this.weight = weight // 重量
  this.price = price // 价格
  this.deliveryID = deliveryID // 订单号
  this.option = option // 其他操作
  this.priceVos = priceVos // 该产品包含的等级以及各等级的最低价格
  this.minPrice = minPrice // 该产品目前的最低价
  this.gradeName = gradeName // 该产品的等级
  this.low = low // 是否低于最低
  this.store = store // 库存地点信息
  this.amount = amount // 小计
  this.priceVo = priceVo // 产品目前等级相关价格
  this.status = status // 订单行项目当前状态
  this.invoiceNumbers = invoiceNumbers // 发货单号
  this.application = application // 用途
  this.packageNumber = packageNumber
  this.fobPrice = fobPrice
  this.batchNumbers = batchNumbers
  this.kpein = kpein // 定价单位
}
export function CompanyInfo (id, companyName, receiver, receiverPhoneNum, companyAddress, isCollect) {
  this.orderId = id
  this.companyName = companyName
  this.receiver = receiver
  this.receiverPhoneNum = receiverPhoneNum
  this.companyAddress = companyAddress
  this.isCollect = isCollect
}

export function ForeignOrderData (id, src, spec, batchNum, lalanNum, speed, holeCount, level,
  weight, price, money, deliveryID, packageNum, boxWeight, boxType, netWeight, grossWeight, volume, option) {
  this.id = id
  this.src = src // 图片地址
  this.spec = spec // 规格
  this.bacthNum = batchNum // 批号
  this.lalanNum = lalanNum // 罗拉旦数
  this.speed = speed // 转速
  this.holeCount = holeCount // 孔数
  this.level = level // 等级
  this.weight = weight // 重量
  this.price = price // 价格
  this.money = money // 总价格
  this.deliveryID = deliveryID // 订单号
  this.packageNum = packageNum // 箱数
  this.boxWeight = boxWeight // 箱重
  this.boxType = boxType // 箱型
  this.netWeight = netWeight // 净重
  this.grossWeight = grossWeight // 毛重
  this.volume = volume // 体积
  this.option = option // 其他操作
}
