import OA_REVIEW_PICTURE from '../../assets/img/orderassistant_confirmed.png'
import COMMIT from '../../assets/img/orderassistant_approved.png'
import CANCEL from '../../assets/img/order_fail.png'

export function getStatus (status) {
  var order = {}
  switch (status) {
    case 'SAVED' :
      order.orderStatusBackColor = 'status-warning'
      order.src = OA_REVIEW_PICTURE
      order.statusDesp = '草稿'
      break
    case 'REVIEW' :
      order.orderStatusBackColor = 'status-warning'
      order.statusDesp = '审核中'
      order.src = OA_REVIEW_PICTURE
      break
    case 'PENDING_COMMIT' :
      order.orderStatusBackColor = 'status-warning'
      order.statusDesp = '待提交'
      order.src = OA_REVIEW_PICTURE
      break
    case 'PENDING_DELIVERY' :
      order.orderStatusBackColor = 'status-warning'
      order.statusDesp = '待发货'
      order.src = COMMIT
      break
    case 'DELIVERYED' :
      order.orderStatusBackColor = 'status-warning'
      order.statusDesp = '发货中'
      order.src = COMMIT
      break
    case 'RECEIVED' :
      order.orderStatusBackColor = 'status-success'
      order.statusDesp = '已完成'
      order.src = COMMIT
      break
    case 'CANCEL' :
      order.orderStatusBackColor = 'status-danger'
      order.statusDesp = '取消'
      order.src = CANCEL
      break
    case 'STOP' :
      order.orderStatusBackColor = 'status-success'
      order.statusDesp = '已终止'
      order.src = CANCEL
      break
  }
  return order
}
