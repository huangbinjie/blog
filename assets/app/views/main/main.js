"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Emoji = require("../../components/emotion");
const Style = require("./main_style");
class Main extends React.Component {
    render() {
        return (React.createElement("div", { className: Style.MAIN },
            "\u304A\u304B\u3048\u308A\u306A\u3055\u3044",
            React.createElement(Emoji.Interesting, null),
            React.createElement("a", { href: "http://www.reactivemanifesto.org/" },
                React.createElement("img", { style: { border: 0, position: "fixed", right: 0, top: 0, zIndex: 9000 }, src: "//d379ifj7s9wntv.cloudfront.net/reactivemanifesto/images/ribbons/we-are-reactive-white-right.png" }))));
    }
}
exports.default = Main;
