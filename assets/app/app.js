"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_dom_1 = require("react-dom");
const ractor_react_1 = require("ractor-react");
const react_router_1 = require("react-router");
const system_1 = require("./system");
const stores_1 = require("./stores");
const HistoryStore_1 = require("./stores/HistoryStore");
const layout_1 = require("./views/layout");
react_dom_1.render(React.createElement(ractor_react_1.Provider, { system: system_1.system, stores: stores_1.stores },
    React.createElement(react_router_1.Router, { history: HistoryStore_1.history },
        React.createElement(layout_1.default, null))), document.getElementById("root"));
