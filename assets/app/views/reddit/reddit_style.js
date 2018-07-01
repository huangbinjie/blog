"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = require("typestyle");
const csstips_1 = require("csstips");
exports.LI = typestyle_1.style(csstips_1.flex, csstips_1.horizontal, csstips_1.center, {
    margin: "20px 0"
});
exports.LI_UPS = typestyle_1.style({
    minWidth: "40px",
    marginRight: "5px",
    fontSize: "21px",
    lineHeight: 1,
    textAlign: "center",
    color: "#30A9DE"
});
exports.LI_NUM = typestyle_1.style({
    width: "40px",
    textAlign: "center",
    color: "#d3d3d3"
});
exports.LI_CONTENT = typestyle_1.style(csstips_1.flex1);
exports.LI_CONTENT_HEADER = typestyle_1.style({
    marginBottom: "8px"
});
exports.LI_CONTENT_TITLE = typestyle_1.style({
    fontSize: "18px",
    fontWeight: 700
});
exports.LI_CONTENT_DOMAIN = typestyle_1.style({
    color: "#888"
});
