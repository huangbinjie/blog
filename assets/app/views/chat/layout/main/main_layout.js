"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const stage_1 = require("../../stage/stage");
const room_1 = require("../../room/room");
const Style = require("./main_layout_style");
class Main extends React.Component {
    render() {
        return (React.createElement("div", { className: Style.MAIN },
            React.createElement(stage_1.default, null),
            React.createElement(room_1.default, { user: this.props.user, messages: this.props.messages })));
    }
}
exports.default = Main;
