"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
exports.default = ({ num = 1 }) => React.createElement("span", null, Array(num).fill(0).map((n, i) => React.createElement("span", { key: i }, "\u00A0")));
