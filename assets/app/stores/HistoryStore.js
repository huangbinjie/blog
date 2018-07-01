"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = require("history");
const react_router_ractor_1 = require("react-router-ractor");
exports.history = history_1.createBrowserHistory();
exports.HistoryStore = react_router_ractor_1.createHistoryStore(exports.history);
