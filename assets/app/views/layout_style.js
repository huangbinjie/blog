"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typestyle_1 = require("typestyle");
const csstips_1 = require("csstips");
csstips_1.normalize();
csstips_1.setupPage("#root");
typestyle_1.cssRule("a", {
    textDecoration: "none"
});
typestyle_1.cssRule("*", {
    margin: 0,
    padding: 0
});
exports.CONTAINER = typestyle_1.style(csstips_1.fillParent, csstips_1.horizontal);
