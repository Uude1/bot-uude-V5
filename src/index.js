"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.config = exports.client = void 0;
var ExtendedClient_1 = require("./structs/ExtendedClient");
var config_json_1 = require("./config.json");
exports.config = config_json_1["default"];
__exportStar(require("colors"), exports);
var client = new ExtendedClient_1.ExtendedClient();
exports.client = client;
client.start();
///////ANTI-ERROR
process.on('unhandledRejection', function (razao, promessa) {
    console.log("Nova rejei\u00E7\u00E3o n\u00E3o tratada \u26A0\uFE0F\n\n" + razao, promessa);
});
process.on('uncaughtException', function (erro, origem) {
    console.log("Nova exce\u00E7\u00E3o n\u00E3o capturada \u26A0\uFE0F\n\n" + erro, origem);
});
process.on('uncaughtExceptionMonitor', function (erro, origem) {
    console.log("Nova exce\u00E7\u00E3o n\u00E3o capturada pelo monitor \u26A0\uFE0F\n\n" + erro, origem);
});
