import Vue from 'vue'
import Router from 'vue-router'
import thousandsQuestion from '@/pages/thousands-question/thousands-question'
import stockReport from '@/pages/thousands-question/stockReport'
import Details from '@/pages/details/details'
import ContractDetails from '@/pages/contract/contract-details'
import DynamicsDetails from '@/pages/dynamics/dynamics-details'
import ArDaily from '@/pages/daily/ar-daily'
import SrDaily from '@/pages/daily/sr-daily'
import FrDaily from '@/pages/daily/fr-daily'
import dailyList from '@/pages/daily/daily-list'
import TableCtmTds from '@/pages/daily/ctm-report'
import CustomerReceptionDetail from '@/pages/activity/customer-reception-detail'
import BusinessChanceDetail from '@/pages/business/business-chance-detail'
import IntelligenceItemDetail from '@/pages/market/intelligence-item-detail'
import MarketActivityDetail from '@/pages/market/market-activity-detail'
import MarketSignUp from '@/pages/market/market-sign-up'
import QuotedPriceDetail from '@/pages/business/quoted-price-detail'
import SampleDetail from '@/pages/business/sample-detail'
import TaskDetail from '@/pages/market/task-detail'
import OrderDetail from '@/pages/order/order-detail'
import todoProcess from '@/pages/todo/todo-process'
import UnclearContractDeliveryForm from '@/pages/contract/unclear-contract-delivery-form'
import UnclearContractReceiptForm from '@/pages/contract/unclear-contract-receipt-form'
import ReceiptDetail from '@/pages/contract/receipt-detail'
import InvoiceReportByMonth from '@/pages/report/invoice-report-by-month'
import AnnouncementList from '@/pages/announcement-center/announcement-list'
import AnnouncementDetail from '@/pages/announcement-center/announcement-detail'
import ReceiptReportByMonth from '@/pages/report/receipt-report-by-month'
import InvoiceReportByMonthFactory from '@/pages/report/invoice-report-by-month-factory'
import StockWerksSummary from '@/pages/report/stock-werks-summary'
import StockMatnrDetail from '@/pages/report/stock-matnr-detail'
import establishedProcess from '@/pages/established-process/process-list'
import ReceiptList from '@/pages/receipt/receipt-list'
import ClueDetail from '@/pages/business/clue-detail'
import StoreManageDetails from '@/pages/store/store-manage-details'
import RetailSummaryReport from '@/pages/report/retail-summary-report'
import ProjectSummaryReport from '@/pages/report/project-summary-report'
import SummaryReport from '@/pages/report/summary-report'
import PlanCompletionRate from '@/pages/report/plan-completion-rate'
import DealerPlanDetail from '@/pages/dealerplan/dealer-plan-detail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/thousands-questions',
      name: 'thousands-questions',
      component: thousandsQuestion
    },
    {
      path: '/stockReport',
      name: 'stockReport',
      component: stockReport
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    },
    {
      path: '/contract-details',
      name: 'ContractDetails',
      component: ContractDetails
    },
    {
      path: '/dynamics-details',
      name: 'DynamicsDetails',
      component: DynamicsDetails
    },
    {
      path: '/ar-daily',
      name: 'ArDaily',
      component: ArDaily
    },
    {
      path: '/sr-daily',
      name: 'SrDaily',
      component: SrDaily
    },
    {
      path: '/fr-daily',
      name: 'FrDaily',
      component: FrDaily
    },
    {
      path: '/ctm-report',
      name: 'TableCtmTds',
      component: TableCtmTds
    },
    {
      path: '/clue-detail',
      name: 'ClueDetail',
      component: ClueDetail
    }, {
      path: '/business-chance-detail',
      name: 'BusinessChanceDetail',
      component: BusinessChanceDetail
    },
    {
      path: '/intelligence-item-detail',
      name: 'IntelligenceItemDetail',
      component: IntelligenceItemDetail
    }, {
      path: '/quoted-price-detail',
      name: 'QuotedPriceDetail',
      component: QuotedPriceDetail
    }, {
      path: '/sample-detail',
      name: 'SampleDetail',
      component: SampleDetail
    },
    {
      path: '/market-activity-detail',
      name: 'MarketActivityDetail',
      component: MarketActivityDetail
    },
    {
      path: '/market-sign-up',
      name: 'MarketSignUp',
      component: MarketSignUp
    },
    {
      path: '/task-detail',
      name: 'TaskDetail',
      component: TaskDetail
    },
    {
      path: '/order-detail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/todo-process',
      name: 'todo-process',
      component: todoProcess
    },
    {
      path: '/unclear-contract-delivery-form',
      name: 'unclear-contract-delivery-form',
      component: UnclearContractDeliveryForm
    },
    {
      path: '/unclear-contract-receipt-form',
      name: 'unclear-contract-receipt-form',
      component: UnclearContractReceiptForm
    },
    {
      path: '/receipt-detail',
      name: 'receipt-detail',
      component: ReceiptDetail
    },
    {
      path: '/invoice-report-by-month',
      name: 'invoice-report-by-month',
      component: InvoiceReportByMonth
    },
    {
      path: '/announcement-list',
      name: 'announcement-list',
      component: AnnouncementList
    },
    {
      path: '/announcement-detail',
      name: 'announcement-detail',
      component: AnnouncementDetail
    },
    {
      path: '/receipt-report-by-month',
      name: 'receipt-report-by-month',
      component: ReceiptReportByMonth
    },
    {
      path: '/established-process',
      name: 'establish-process',
      component: establishedProcess
    },
    {
      path: '/daily-list',
      name: 'daily-list',
      component: dailyList
    },
    {
      path: '/invoice-report-by-month-factory',
      name: 'invoice-report-by-month-factory',
      component: InvoiceReportByMonthFactory
    },
    {
      path: '/receipt-list',
      name: 'receipt-list',
      component: ReceiptList
    },
    {
      path: '/stock-werks-summary',
      name: 'stock-werks-summary',
      component: StockWerksSummary
    },
    {
      path: '/stock-matnr-detail',
      name: 'stock-matnr-detail',
      component: StockMatnrDetail
    },
    {
      path: '/customer-reception-detail',
      name: 'customer-reception-detail',
      component: CustomerReceptionDetail
    },
    /*门店详情*/
    {
      path: '/store-manage-details',
      name: 'store-manage-details',
      component: StoreManageDetails
    },
    /*零售报表*/
    {
      path: '/retail-summary-report',
      name: 'retail-summary-report',
      component: RetailSummaryReport
    },
    /*工程报表*/
    {
      path: '/project-summary-report',
      name: 'project-summary-report',
      component: ProjectSummaryReport
    },
    /*汇总报表*/
    {
      path: '/summary-report',
      name: 'summary-report',
      component: SummaryReport
    },
    /*计划完成率报表*/
    {
      path: '/plan-completion-rate',
      name: 'plan-completion-rate',
      component: PlanCompletionRate
    },
    /*经销商计划详情*/
    {
      path: '/dealer-plan-detail',
      name: 'dealer-plan-detail',
      component: DealerPlanDetail
    },


  ]
})
