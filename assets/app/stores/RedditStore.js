"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ractor_1 = require("ractor");
const reddit_api_1 = require("../apis/reddit_api");
const FetchRedditData_1 = require("../messages/reddit/FetchRedditData");
class RedditStore extends ractor_1.Store {
    constructor() {
        super(...arguments);
        this.state = { posts: [], slag: "/r/javascript" };
    }
    createReceive() {
        return this.receiveBuilder()
            .match(FetchRedditData_1.FetchRedditData, fetchData => reddit_api_1.list(this.state.slag).subscribe(data => this.setState({ posts: data.data.children })))
            .build();
    }
}
exports.RedditStore = RedditStore;
