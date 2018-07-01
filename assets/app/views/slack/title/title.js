"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Style = require("./title_style");
class Title extends React.Component {
    render() {
        return (React.createElement("h3", { className: Style.TITLE }, "\u4ECA\u65E5\u7684\u4E94\u5E74\u4E8C\u73ED"));
    }
}
exports.default = Title;
