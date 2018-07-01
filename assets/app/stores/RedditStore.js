"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reddit_api_1 = require("../apis/reddit_api");
const FetchRedditData_1 = require("../messages/reddit/FetchRedditData");
const ractor_callbag_1 = require("ractor-callbag");
const callbag_basics_1 = require("callbag-basics");
const callbag_flat_map_operator_1 = require("callbag-flat-map-operator");
class RedditStore extends ractor_callbag_1.CallbagStore {
    constructor() {
        super(...arguments);
        this.state = { posts: [], slag: "/r/javascript" };
    }
    createReceive() {
        return this.receiveBuilder()
            .match(FetchRedditData_1.FetchRedditData, fetchData$ => callbag_basics_1.pipe(fetchData$, callbag_flat_map_operator_1.default((fetchData) => callbag_basics_1.fromPromise(reddit_api_1.list(this.state.slag))), callbag_basics_1.map((data) => ({ posts: data.data.children }))))
            .build();
    }
}
exports.RedditStore = RedditStore;
