import { ExtendedClient } from "./structs/ExtendedClient"
import config from "./config.json";
export * from "colors";

const client = new ExtendedClient();
client.start();

export { client, config }

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