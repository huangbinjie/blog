export function friendlyDate(time: number) {
	const date = Date.now() - time * 1000

	if (date < 60000)
		return "刚刚"
	if (date < 3600000)
		return Math.floor(date / 60000) + "分钟前"
	if (date < 86400000)
		return Math.floor(date / 3600000) + "小时前"
	if (date < 604800000)
		return +Math.floor(date / 86400000) + "天前"
	if (date < 2592000000)
		return Math.floor(date / (86400000 * 7)) + "星期前"
	if (date < 31536000000)
		return Math.floor(date / (86400000 * 30)) + "个月前"
	return Math.floor(date / 31536000000) + "年前"

}
