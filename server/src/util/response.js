"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleResponse = void 0;
// res from express
// status -> status code
// data from service
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var handleResponse = function (res, status, data) {
    res.status(status).json(data);
};
exports.handleResponse = handleResponse;
