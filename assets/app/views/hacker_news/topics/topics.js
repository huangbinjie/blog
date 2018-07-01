"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const office_ui_fabric_react_1 = require("office-ui-fabric-react");
const space_1 = require("../../../components/space/space");
const Style = require("./topics_style");
const unix_time_to_date_1 = require("../../../utils/unix_time_to_date");
exports.default = ({ posts }) => React.createElement("div", null,
    !posts.length && React.createElement(office_ui_fabric_react_1.Spinner, { type: office_ui_fabric_react_1.SpinnerType.large, label: "\u6B63\u5728\u52AA\u529B\u52A0\u8F7D\u4E2D..." }),
    !!posts.length && React.createElement(office_ui_fabric_react_1.List, { items: posts, onRenderCell: renderCell }));
const renderCell = (item, index) => {
    return (React.createElement("div", { key: item.id, className: Style.LI },
        React.createElement("div", { className: Style.LI_NUM }, index + 1),
        React.createElement("div", { className: Style.LI_UPS }, item.score),
        React.createElement("div", { className: Style.LI_CONTENT },
            React.createElement("header", { className: Style.LI_CONTENT_HEADER },
                React.createElement(office_ui_fabric_react_1.Link, { className: Style.LI_CONTENT_TITLE, href: item.url }, item.title)),
            React.createElement("footer", null,
                "post by ",
                item.by,
                React.createElement(space_1.default, null),
                "|",
                React.createElement(space_1.default, null),
                item.descendants,
                React.createElement(space_1.default, null),
                React.createElement(office_ui_fabric_react_1.Link, { href: "https://news.ycombinator.com/item?id=" + item.id }, "comments"),
                React.createElement(space_1.default, null),
                "|",
                React.createElement(space_1.default, null),
                unix_time_to_date_1.friendlyDate(item.time)))));
};
