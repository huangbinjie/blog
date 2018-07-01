"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ractor_1 = require("ractor");
class LoggerStore extends ractor_1.Store {
    constructor() {
        super(...arguments);
        this.state = {};
    }
    preStart() {
        this.context.system.eventStream.onAny((_, obj) => {
            const date = new Date();
            console.info(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), obj);
        });
    }
    createReceive() {
        return this.receiveBuilder().build();
    }
}
exports.LoggerStore = LoggerStore;
