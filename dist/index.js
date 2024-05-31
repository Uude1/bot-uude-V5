"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.client = void 0;
const tslib_1 = require("tslib");
const ExtendedClient_1 = require("./structs/ExtendedClient");
const config_json_1 = tslib_1.__importDefault(require("./config.json"));
exports.config = config_json_1.default;
tslib_1.__exportStar(require("colors"), exports);
const client = new ExtendedClient_1.ExtendedClient();
exports.client = client;
client.start();
///////ANTI-ERROR
process.on('unhandledRejection', (razao, promessa) => {
    console.log(`Nova rejeição não tratada ⚠️\n\n` + razao, promessa);
});
process.on('uncaughtException', (erro, origem) => {
    console.log(`Nova exceção não capturada ⚠️\n\n` + erro, origem);
});
process.on('uncaughtExceptionMonitor', (erro, origem) => {
    console.log(`Nova exceção não capturada pelo monitor ⚠️\n\n` + erro, origem);
});
