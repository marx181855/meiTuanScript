import ajax from "../utils/ajax";
import { replyText } from "./constant";
import { formatDateTime } from "../utils/functions";

export default async function() {
  try {
    const data = {
      token: sessionStorage.getItem('token'),
      acctId: sessionStorage.getItem('acctId'),
      wmPoiId: sessionStorage.getItem('wmPoiId'),
      bsid: sessionStorage.getItem('bsid'),
      ignoreSetRouterProxy: true,
      appType: 3,
      pageNum: 1,
      pageSize: 10,
      commScore: 1, // 满意程度， 全部 0， 好评 1， 中评 2， 差评 3
      commType: 0, // 是否回复，全部 -1， 未回复 0， 已回复 1
      hasContent: -1,
      beginTime: 1632528000,
      endTime: 1635120000,
      periodType: 1,
      onlyAuditNotPass: 0,
      commentKeyWord: '',
      optimus_uuid: '',
      optimus_risk_level: '',
      optimus_code: 10,
      optimus_partner: 19,
    }
    const res: any = await ajax({
      url: 'https://waimaieapp.meituan.com/gw/customer/comment/list',
      method: 'GET',
      data,
    });
    const commentList = res.data.list;
    for(const item of commentList) {
      const data = {
        token: sessionStorage.getItem('token'),
        acctId: sessionStorage.getItem('acctId'),
        wmPoiId: sessionStorage.getItem('wmPoiId'),
        bsid: sessionStorage.getItem('bsid'),
        ignoreSetRouterProxy: true,
        appType: 3,
        toCommentId: item.id,
        comment: replyText[Math.floor(Math.random() * replyText.length)],
        userCommentCtime: formatDateTime('yyyy-MM-dd'),
      }

      console.debug(data)
      const res = await ajax({
        url: 'https://waimaieapp.meituan.com/gw/customer/comment/reply?ignoreSetRouterProxy=true',
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      });
    }
  } catch(e) {
    console.error(e);
  }
}