"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = require("typestyle");
const csstips_1 = require("csstips");
exports.MESSAGES = typestyle_1.style(csstips_1.flex, {
    height: "100%"
});
exports.LIST = typestyle_1.style(csstips_1.flex, csstips_1.fillParent);
exports.LIST_ITEM = typestyle_1.style(csstips_1.flex, csstips_1.horizontal, {
    padding: "10px 0"
});
exports.LIST_AVATAR = typestyle_1.style({
    width: "48px",
    height: "48px",
    marginRight: "10px",
    borderRadius: "50%"
});
exports.LIST_CONTENT = typestyle_1.style(csstips_1.flex, {
    $nest: {
        header: {
            color: "#666"
        },
        main: {
            lineHeight: "30px",
            color: "#333",
            whiteSpace: "pre-wrap",
            wordBreak: "break-all"
        }
    }
});
