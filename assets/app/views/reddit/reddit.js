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
const reddit_1 = require("../../messages/reddit");
const RedditStore_1 = require("../../stores/RedditStore");
const space_1 = require("../../components/space/space");
const unix_time_to_date_1 = require("../../utils/unix_time_to_date");
const Style = require("./reddit_style");
let Reddit = class Reddit extends React.Component {
    constructor() {
        super(...arguments);
        this.renderCell = (item, index) => {
            return (React.createElement("div", { key: item.data.id, className: Style.LI },
                React.createElement("div", { className: Style.LI_NUM }, index + 1),
                React.createElement("div", { className: Style.LI_UPS }, item.data.ups),
                React.createElement("div", { className: Style.LI_CONTENT },
                    React.createElement("header", { className: Style.LI_CONTENT_HEADER },
                        React.createElement(office_ui_fabric_react_1.Link, { className: Style.LI_CONTENT_TITLE, href: item.data.url }, item.data.title),
                        React.createElement(space_1.default, { num: 3 }),
                        React.createElement(office_ui_fabric_react_1.Link, { className: Style.LI_CONTENT_DOMAIN, href: `https://www.reddit.com` + item.data.domain },
                            React.createElement("small", null,
                                "(",
                                item.data.domain,
                                ")"))),
                    React.createElement("footer", null,
                        "post by ",
                        item.data.author,
                        React.createElement(space_1.default, null),
                        "|",
                        React.createElement(space_1.default, null),
                        item.data.num_comments,
                        React.createElement(space_1.default, null),
                        React.createElement(office_ui_fabric_react_1.Link, { href: "https://www.reddit.com" + item.data.permalink }, "comments"),
                        React.createElement(space_1.default, null),
                        "|",
                        React.createElement(space_1.default, null),
                        unix_time_to_date_1.friendlyDate(item.data.created_utc)))));
        };
    }
    componentDidMount() {
        system_1.system.dispatch(new reddit_1.FetchRedditData());
    }
    render() {
        return (React.createElement(office_ui_fabric_react_1.FocusZone, { direction: office_ui_fabric_react_1.FocusZoneDirection.vertical },
            React.createElement(office_ui_fabric_react_1.TextField, { value: this.props.slag, label: "\u9891\u9053" }),
            !this.props.posts.length && React.createElement(office_ui_fabric_react_1.Spinner, { type: office_ui_fabric_react_1.SpinnerType.large, label: "\u6B63\u5728\u52AA\u529B\u52A0\u8F7D\u4E2D..." }),
            !!this.props.posts.length && React.createElement(office_ui_fabric_react_1.List, { items: this.props.posts, onRenderCell: this.renderCell })));
    }
};
Reddit = __decorate([
    ractor_react_1.Providers([RedditStore_1.RedditStore])
], Reddit);
exports.default = Reddit;
