"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const meng_1 = require("meng");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const Style = require("./username_layout_style");
exports.default = () => React.createElement("div", { className: Style.USERNAME },
    React.createElement(office_ui_fabric_react_1.TextField, { placeholder: "\u76AE\u76AE\u867E\u6211\u4EEC\u8D70", maxLength: 10, required: true, label: "\u6635\u79F0", onKeyDown: onEnter }));
function onEnter(event) {
    if (event.keyCode === 13) {
        meng_1.default.setState({ user: event.currentTarget.value });
    }
}
