"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parse(dateStr) {
    const prevTime = new Date(dateStr).getTime();
    const biasTime = Date.now() - prevTime;
    if (biasTime < 60000)
        return "刚刚";
    if (biasTime < 3600000)
        return Math.floor(biasTime / 60000) + "分钟前";
    if (biasTime < 86400000)
        return Math.floor(biasTime / 3600000) + "小时前";
    if (biasTime < 604800000)
        return +Math.floor(biasTime / 86400000) + "天前";
    if (biasTime < 2592000000)
        return Math.floor(biasTime / (86400000 * 7)) + "星期前";
    if (biasTime < 31536000000)
        return Math.floor(biasTime / (86400000 * 30)) + "个月前";
    return Math.floor(biasTime / 31536000000) + "年前";
}
exports.parse = parse;
