import { serialize } from './functions';

interface Options {
  url: string;
  method: 'GET' | 'POST' | 'HEAD',
  async?: boolean;
  timeout?: number;
  headers?: { [index: string]: string };
  responseType?: "arraybuffer" | "blob" | "document" | "json" |  "text";
  data?:{ [index: string]: any };
}

/** 封装的ajax请求函数 */
function ajax(optionsOverride: Options) {
  // 将传入的参数与默认设置合并
  const options = {
    async: true,
    timeout: 3000,
    responseType: "json",
  } as Options;
  

  for(const k in optionsOverride) {
    options[k] = optionsOverride[k];
  }
  if (optionsOverride.method === 'GET' && optionsOverride.data) {
    options.url += `?${serialize(optionsOverride.data)}`;
  }
  const xhr = new XMLHttpRequest();

  return new Promise((resolve, reject) => {
    xhr.open(options.method, options.url, options.async);
    xhr.timeout = options.timeout;

    for(const k in options.headers) {
      xhr.setRequestHeader(k, options.headers[k]);
    }
    
    xhr.responseType = options.responseType;
    xhr.onabort = () => {
      reject(new Error(JSON.stringify({ errorType: 'abort_error', xhr })));
    }
    xhr.ontimeout = () => {
      reject(new Error(JSON.stringify({ errorType: 'timeout_error', xhr })));
    }
    xhr.onerror = () => {
      reject(new Error(JSON.stringify({ errorType: 'onerror', xhr })));
    }
    xhr.onloadend = () => {
      if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        resolve(xhr.response);
      } else {
        reject({ errorType: 'status_error', xhr });
      }
    }
    try {
      xhr.send(serialize(options.data))
    } catch (e) {
      reject(new Error(JSON.stringify({ errorType: 'send_error', xhr })));
    }
  });

}

export default ajax;
