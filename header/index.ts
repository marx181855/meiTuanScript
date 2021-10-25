import {GmFunctions, RunAt, UserScript} from "./UserScript";
import build from "./build";

const script: UserScript = {
    name: 'autoReply',
    namespace: '',
    description: '美团商家自动回复顾客评论',
    version: '1.0.0',
    includes: ['https://waimaieapp.meituan.com/frontweb/userComment*', 'https://e.waimai.meituan.com*'],
    grants: [GmFunctions.GM_xmlhttpRequest],
    runAt: RunAt.document_end,
}

build(script,'app_header.js')
