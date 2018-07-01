"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const ractor_react_1 = require("ractor-react");
const system_1 = require("../../system");
const HNStore_1 = require("../../stores/HNStore");
const hn_1 = require("../../messages/hn");
const title_1 = require("./title/title");
const pivot_1 = require("./pivot/pivot");
const topics_1 = require("./topics/topics");
let HN = class HN extends React.Component {
    componentWillUnmount() {
        system_1.system.dispatch(new hn_1.CloseSocket());
    }
    componentDidMount() {
        if (!this.props.posts.length) {
            system_1.system.dispatch(new hn_1.Init());
        }
    }
    render() {
        return (React.createElement(office_ui_fabric_react_1.FocusZone, { direction: office_ui_fabric_react_1.FocusZoneDirection.vertical },
            React.createElement(title_1.default, null),
            pivot_1.default(this.props.selectedKey),
            React.createElement(topics_1.default, { posts: this.props.posts })));
    }
};
HN = __decorate([
    ractor_react_1.Providers([HNStore_1.HNStore])
], HN);
exports.default = HN;
