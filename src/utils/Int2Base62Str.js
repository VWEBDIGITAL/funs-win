// 定义 62 进制字符集
const BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// 将十进制数转换为 62 进制字符串
export function decimalToBase(decimal) {
	if (decimal === 0) {
		return BASE62[0];
	}

	let base62 = '';
	while (decimal > 0) {
		let remainder = decimal % 62;
		base62 = BASE62[remainder] + base62;
		decimal = Math.floor(decimal / 62);
	}

	return base62;
}

// 示例：将十进制 123456 转换为 62 进制
// let decimalNumber = 123456;
// let base62String = decimalToBase(decimalNumber);
// console.log(base62String);  // 输出结果为：W7E