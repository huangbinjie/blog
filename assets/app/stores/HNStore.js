"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase = require("firebase");
const ractor_1 = require("ractor");
const hn_1 = require("../messages/hn");
firebase.initializeApp({ databaseURL: "hacker-news.firebaseio.com" });
class HNStore extends ractor_1.Store {
    constructor() {
        super(...arguments);
        this.state = { posts: [], tab: "newstories", selectedKey: "0" };
    }
    preStart() {
        this.database = firebase.database();
        this.app = this.database.ref("/v0");
    }
    createReceive() {
        return this.receiveBuilder()
            .match(hn_1.Init, () => {
            this.database.goOnline();
            this.receiveValues(this.state.tab);
        })
            .match(hn_1.TabChanged, tabChanged => {
            this.setState({ posts: [], tab: tabChanged.tab, selectedKey: tabChanged.key });
            this.receiveValues(tabChanged.tab);
        })
            .match(hn_1.CloseSocket, () => this.database.goOffline())
            .build();
    }
    receiveValues(tab) {
        this.app.child(tab).off();
        this.app.child(tab).on("value", snapshot => {
            const ids = snapshot.val();
            const promiseIds = ids.map(id => new Promise((resolve, reject) => {
                this.app.child("/item/" + id).off();
                this.app.child("/item/" + id).on("value", ss => resolve(ss.val()));
            }));
            Promise
                .all(promiseIds)
                // 不知道怎么回事firebase第二次查询有可能返回null，先过滤掉
                .then(values => values.filter(value => value !== null))
                .then(values => this.setState({ posts: values }));
        });
    }
}
exports.HNStore = HNStore;
