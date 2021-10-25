import ajax from '../utils/ajax';
import gmAjax from '../utils/GmAjax';

interface WmOrderItem {
  wm_poi_id: number;
  wm_order_id_view: number;
  estimated_make_time: number;
  order_time: number;
}

interface Result {
  pageCount: number;
  totalCount: number;
  wmOrderList: WmOrderItem[];
}

export default async function() {
  const timer = setInterval(async () => {
    try {
      const res: any = await gmAjax({
        url: 'https://e.waimai.meituan.com/v2/order/common/unprocessed/r/list?region_id=1000440100&region_version=1600916666&tag=prepMeal&pageSize=10&pageNum=1',
        method: "GET"
      });
      console.debug(res);
      const data: Result = res.data;
      for(const item of data.wmOrderList) {
        return;
        // 要判断时间段内才能出餐，才能请求出餐接口
        const res: any = await ajax({
          url: 'https://e.waimai.meituan.com/v2/common/w/reported/completeMealTime?region_id=1000440100&region_version=1600916666',
          method: 'POST',
          data: {
            wmPoiId: item.wm_poi_id,
            wmOrderViewId: item.wm_order_id_view,
            csrfToken: (window.top as any)._csrfToken_,
          }
        })
      }

    } catch (e) {
      console.error(e);
    }
  }, 1000);
  setTimeout(() => clearInterval(timer), 1000);
  // clearInterval(timer);
  // 由于订单获取轮询的机制，前端一直请求后端，判断是否有新订单，所以我要循环发送请求，然后解析请求，再判断，再发送post请求
};
