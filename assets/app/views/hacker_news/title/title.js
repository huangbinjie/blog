"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const Emoji = require("../../../components/emotion");
const Style = require("./title_style");
class Title extends React.Component {
    render() {
        return (React.createElement("h3", { className: Style.TITLE },
            React.createElement("span", null, "hn\u63A5\u53E3\u4F7F\u7528\u7684"),
            React.createElement(office_ui_fabric_react_1.Link, { href: "https://firebase.google.com/" }, "firebase"),
            React.createElement("span", null, "\uFF0C\u53EF\u80FD\u9700\u8981\u7FFB\u5899"),
            React.createElement(Emoji.Interesting, null)));
    }
}
exports.default = Title;
