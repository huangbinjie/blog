"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ractor_react_1 = require("ractor-react");
const system_1 = require("../../system");
const FetchSlackData_1 = require("../../messages/slack/FetchSlackData");
const SlackStore_1 = require("../../stores/SlackStore");
const messages_1 = require("./messages/messages");
const title_1 = require("./title/title");
const flex_1 = require("../../components/flex/flex");
const Style = require("./slack_style");
let Slack = class Slack extends React.Component {
    componentDidMount() {
        if (this.props.messages.length === 0) {
            system_1.system.dispatch(new FetchSlackData_1.FetchSlackData());
        }
    }
    render() {
        return (React.createElement("div", { className: Style.SLACK },
            React.createElement(title_1.default, null),
            React.createElement(flex_1.default, { flexGrow: 1, flexDirection: "row", style: { height: " 100%" } },
                React.createElement(messages_1.default, { cache: this.props.cache, initialScrollTop: this.props.initialScrollTop, messages: this.props.messages }))));
    }
};
Slack = __decorate([
    ractor_react_1.Providers([SlackStore_1.SlackStore])
], Slack);
exports.default = Slack;
