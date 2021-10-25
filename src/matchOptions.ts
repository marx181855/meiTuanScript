import autoReply from './autoReply/autoReply';
import autoCompleteMeal from './autoCompleteMeal/autoCompleteMeal';

// 目标网站url匹配模块功能在这里填写
const matchOptions = {
  // 顾客管理 - 顾客评价模块
  'https://waimaieapp.meituan.com/frontweb/userComment': autoReply,
  // 订单管理 - 待处理 模块
  'https://e.waimai.meituan.com/new_fe/business_gw': autoCompleteMeal,
}











export default matchOptions;


   