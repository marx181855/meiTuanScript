/** 
 * 序列化参数
 * @description 将对象{ a: 1, b: 2 }转换成 a=1&b=2 这个格式 
 * */
export function serialize(data: any) {
	if (!data) return '';
	const pairs = [];
	for (let name in data) {
		if (!data.hasOwnProperty(name)) continue;
		if (typeof data[name] === 'function') continue;
		let value = data[name].toString();
		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name + '=' + value);
	}
	return pairs.join('&');
}

/**
 * @description JS时间Date格式化参数 
 * @description 参数：格式化字符串如：'yyyy-MM-dd hh:mm:ss'
 * @description 结果：如2016-06-01 10:09:00
 */
export function formatDateTime(fmt: string): string {
	const date = new Date();
	const o = {
		"M+": date.getMonth() + 1, //月份 
		"d+": date.getDate(), //日 
		"h+": date.getHours(), //小时 
		"m+": date.getMinutes(), //分 
		"s+": date.getSeconds(), //秒 
		"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
		"S": date.getMilliseconds() // 毫秒
};

	// 根据y的长度来截取年
	if (/(y+)/.test(fmt)) { 
		fmt = fmt.replace(RegExp.$1, date.getFullYear() + '');
	}
	for (const k in o){
	if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	}
	return fmt;

}