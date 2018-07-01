"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const nav_1 = require("../components/nav/nav");
const main_1 = require("./main/main");
const reddit_1 = require("./reddit/reddit");
const slack_1 = require("./slack/slack");
const hacker_news_1 = require("./hacker_news/hacker_news");
const twitter_1 = require("./twitter/twitter");
require("office-ui-fabric-react/dist/css/fabric.min.css");
const Style = require("./layout_style");
class RootLayout extends React.Component {
    render() {
        return (React.createElement("div", { className: Style.CONTAINER },
            /Android|iPhone/i.test(navigator.userAgent) ? null : React.createElement(nav_1.default),
            React.createElement(react_router_dom_1.Switch, null,
                React.createElement(react_router_dom_1.Route, { path: "/", exact: true, component: main_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/reddit", component: reddit_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/slack", component: slack_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/hn", component: hacker_news_1.default }),
                React.createElement(react_router_dom_1.Route, { path: "/twitter/:name", component: twitter_1.TwitterView }))));
    }
}
exports.default = RootLayout;
