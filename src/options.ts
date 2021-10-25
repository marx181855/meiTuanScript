import autoReply from './autoReply';
import autoCompleteMeal from './autoCompleteMeal';

// 目标网站url匹配模块功能在这里填写
export default new Map([
  [/https:\/\/waimaieapp\.meituan.com\/frontweb\/userComment/, autoReply],
  [/https:\/\/e\.waimai.meituan\.com\//, autoCompleteMeal],
]);


   