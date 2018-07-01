"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = require("typestyle");
const csstips_1 = require("csstips");
exports.ROOM = typestyle_1.style(csstips_1.width(300), csstips_1.padding(10), csstips_1.vertical);
exports.LIST = typestyle_1.style(csstips_1.flex1, csstips_1.padding(10), {
    overflow: "auto"
});
exports.FOOTER = typestyle_1.style(csstips_1.horizontal, csstips_1.centerCenter, csstips_1.height(32), {
    $nest: {
        "& > div": {
            flex: 1,
            margin: 0,
            marginLeft: 10
        }
    }
});
