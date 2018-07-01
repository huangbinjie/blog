"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function list(name) {
    return fetch("/twitter/" + name, {
        method: "GET",
        headers: {
            "if-api": "true"
        }
    })
        .then(res => res.json());
}
exports.list = list;
