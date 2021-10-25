/** 
 * 序列化参数
 * @description 将对象{ a: 1, b: 2 }转换成 a=1&b=2 这个格式 
 * */
export function serialize(data: any) {
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