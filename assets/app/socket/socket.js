"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phoenix_1 = require("phoenix");
exports.socket = new phoenix_1.Socket("/socket", {
// logger: ((kind: any, msg: any, data: any) => { console.log(`${kind}: ${msg}`, data) })
});
// socket.onOpen((ev: any) => console.log("OPEN", ev))
// socket.onError((ev: any) => console.log("ERROR", ev))
// socket.onClose((e: any) => console.log("CLOSE", e))
