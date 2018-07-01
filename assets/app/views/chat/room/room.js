"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const Style = require("./room_style");
const chat_api_1 = require("../../../apis/chat_api");
class Room extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { text: "" };
        this.onEnter = (event) => {
            const textNode = event.currentTarget;
            if (event.keyCode === 13 && textNode.value) {
                chat_api_1.push(this.props.user, textNode.value.trim());
                this.setState({ text: "" });
            }
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.messages.length !== prevProps.messages.length) {
            this.main.scrollTop = this.main.scrollHeight;
        }
    }
    render() {
        const messages = this.props.messages.map((message, index) => React.createElement("section", { key: index },
            React.createElement(office_ui_fabric_react_1.Label, { style: { display: "inline-block" } }, message.user),
            React.createElement("span", null,
                ": ",
                message.body)));
        return (React.createElement("div", { className: Style.ROOM },
            React.createElement("main", { className: Style.LIST, ref: main => this.main = main }, messages),
            React.createElement("footer", { className: Style.FOOTER },
                React.createElement(office_ui_fabric_react_1.Label, null, this.props.user),
                React.createElement(office_ui_fabric_react_1.TextField, { onKeyDown: this.onEnter, maxLength: 20, value: this.state.text }))));
    }
}
exports.default = Room;
