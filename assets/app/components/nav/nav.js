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
const react_router_ractor_1 = require("react-router-ractor");
const ractor_react_1 = require("ractor-react");
const HistoryStore_1 = require("../../stores/HistoryStore");
const system_1 = require("../../system");
const nav_config_1 = require("./nav_config");
const Style = require("./nav_style");
let Nav = class Nav extends React.Component {
    constructor() {
        super(...arguments);
        this.linkClick = (event, nav) => {
            event.preventDefault();
            nav.url.indexOf("http") === 0 ? location.href = nav.url : system_1.system.dispatch(new react_router_ractor_1.Push(nav.url));
        };
    }
    render() {
        const pathname = this.props.location.pathname.substr(1);
        return (React.createElement(office_ui_fabric_react_1.Nav, { className: Style.NAV, groups: nav_config_1.groups, selectedKey: pathname, onLinkClick: this.linkClick }));
    }
};
Nav = __decorate([
    ractor_react_1.Providers([HistoryStore_1.HistoryStore])
], Nav);
exports.default = Nav;
