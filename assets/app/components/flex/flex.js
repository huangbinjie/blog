"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const typestyle_1 = require("typestyle");
const csstips_1 = require("csstips");
function Flex(props) {
    const css = {
        flex: props.flex,
        flexAlign: props.flexAlign,
        flexBasis: props.flexBasis,
        flexDirection: props.flexDirection,
        flexGrow: props.flexGrow,
        flexWrap: props.flexWrap
    };
    return React.createElement("div", { className: typestyle_1.style(csstips_1.flex), style: props.style || {} }, props.children);
}
exports.default = Flex;
