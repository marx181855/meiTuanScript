import { serialize } from './functions';

interface Options {
  url: string;
  method: 'GET' | 'POST' | 'HEAD';
  data?: { [index: string]: any };
  headers?: { [index: string]: any };
  timeout?: number;
  cookie?: string;
  binary?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'stream';
}

/** 封装油猴的ajax请求函数，可以解决跨域问题 */
async function gmAjax(optionsOverride: Options) {
  return new Promise((resolve, reject) => {
      // 将传入的参数与默认设置合并
  const options = {
    timeout: 3000,
    responseType: "json",
    onabort: () => {
      reject(new Error(JSON.stringify({ errorType: 'abort_error' })));
    },
    ontimeout: () => {
      reject(new Error(JSON.stringify({ errorType: 'timeout_error' })));
    },
    onerror: () => {
      reject(new Error(JSON.stringify({ errorType: 'onerror' })));
    },
    onload: (res: any) => {
      resolve(res.response);
    }
  };
  for(const k in optionsOverride) {
    if (k === 'data') {
      options[k] = serialize(optionsOverride[k]);
    } else {
      options[k] = optionsOverride[k];
    }
  }
    GM_xmlhttpRequest(options);
  });
}

export default gmAjax;
