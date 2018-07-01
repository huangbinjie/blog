"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = (slag) => fetch("/reddit" + slag, {
    method: "GET",
    headers: {
        "if-api": "true"
    }
}).then(res => res.json());
