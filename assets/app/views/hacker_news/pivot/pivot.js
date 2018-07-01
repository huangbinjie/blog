"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const system_1 = require("../../../system");
const hn_1 = require("../../../messages/hn");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
exports.default = (selectedKey) => React.createElement(office_ui_fabric_react_1.Pivot, { selectedKey: selectedKey, linkSize: office_ui_fabric_react_1.PivotLinkSize.large, onLinkClick: linkClick },
    React.createElement(office_ui_fabric_react_1.PivotItem, { linkText: "newstories", itemKey: "1" }),
    React.createElement(office_ui_fabric_react_1.PivotItem, { linkText: "topstories", itemKey: "2" }),
    React.createElement(office_ui_fabric_react_1.PivotItem, { linkText: "beststories", itemKey: "3" }));
function linkClick(item) {
    system_1.system.dispatch(new hn_1.TabChanged(item.props.linkText, item.props.itemKey));
}
