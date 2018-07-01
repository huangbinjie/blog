"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SlackStore_1 = require("./SlackStore");
const RedditStore_1 = require("./RedditStore");
const LoggerStore_1 = require("./LoggerStore");
const HNStore_1 = require("./HNStore");
const HistoryStore_1 = require("./HistoryStore");
exports.stores = [SlackStore_1.SlackStore, RedditStore_1.RedditStore, HNStore_1.HNStore, LoggerStore_1.LoggerStore, HistoryStore_1.HistoryStore];
