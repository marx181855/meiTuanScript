interface Options {
  url: string;
  method: 'GET' | 'POST',
  async?: boolean;
  timeout?: number;
  headers?: object;
  responseType?: "arraybuffer" | "blob" | "document" | "json" |  "text";
  data?:object
}


// 序列化参数
function serialize(data: any) {
	if (!data) return '';
	var pairs = [];
	for (var name in data) {
		if (!data.hasOwnProperty(name)) continue;
		if (typeof data[name] === 'function') continue;
		var value = data[name].toString();
		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
}

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
