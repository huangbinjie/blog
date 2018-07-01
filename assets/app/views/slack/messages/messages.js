"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const system_1 = require("../../../system");
const react_iscroller_1 = require("react-iscroller");
const Style = require("./message_style");
const slack_1 = require("../../../messages/slack");
class Messages extends React.Component {
    constructor() {
        super(...arguments);
        this.scrollTop = 0;
        this.scrollerHeight = window.innerHeight - 69;
    }
    componentWillUnmount() {
        system_1.system.dispatch(new slack_1.MessageScroll(this.scrollTop));
    }
    render() {
        return (React.createElement("div", { className: Style.MESSAGES },
            !!this.props.messages.length && React.createElement(react_iscroller_1.InfiniteScroller, { containerHeight: this.scrollerHeight, itemAverageHeight: 48, items: this.props.messages, itemKey: "ts", onRenderCell: this.renderCell, onScroll: div => this.scrollTop = div.scrollTop, onEnd: () => system_1.system.dispatch(new slack_1.NextPage()), initialScrollTop: this.props.initialScrollTop, cache: this.props.cache }),
            !this.props.messages.length && React.createElement(office_ui_fabric_react_1.Spinner, { type: office_ui_fabric_react_1.SpinnerType.large, label: "\u6B63\u5728\u52AA\u529B\u52A0\u8F7D\u4E2D..." })));
    }
    renderCell(message, index) {
        const userinfo = message.user;
        return (React.createElement("li", { key: message.ts, className: Style.LIST_ITEM },
            React.createElement("img", { className: Style.LIST_AVATAR, src: userinfo.profile.image_48 }),
            React.createElement("div", { className: Style.LIST_CONTENT },
                React.createElement("header", null,
                    userinfo.name,
                    " ",
                    index),
                React.createElement("main", null, message.text))));
    }
}
exports.default = Messages;
