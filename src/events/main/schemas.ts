import mongoose from 'mongoose';

const Guild = new mongoose.Schema({
  id: { type: String, unique: true, required: true },

  status: {
    messagenid: { type: String, default: null, unique: false },
    messagenchannel: { type: String, default: null, unique: false },
    ipconnect: { type: String, default: null, unique: false },
    ipvps: { type: String, default: null, unique: false },
    url: { type: String, default: null, unique: false },
    vip: { type: String, default: null, unique: false },
    imagem: { type: String, default: null, unique: false },
  },
  ticket: {
    categorydoacoes: { type: String, unique: false, default: null },
    categorysuporte: { type: String, unique: false, default: null },
    categorydenuncias: { type: String, unique: false, default: null },
    ticket_logs: { type: String, unique: false, default: null },
    cargo_staff: { type: String, default: null },
  },
  whitelist: {
    whitelistCategory: { type: String, default: null, unique: false },
    approvedChannel: { type: String, default: null, unique: false },
    reprovedChannel: { type: String, default: null, unique: false },
    approvedRole: { type: String, default: null },
  },
  welcome: {
    welcomeChannel: { type: String, default: null, unique: false },
    goodbyeChannel: { type: String, default: null, unique: false },
    role_welcome: { type: String, default: null },
    welcomeImage: { type: String, default: null, unique: false },
    welcomeMessage: { type: String, default: null, unique: false },
  },
  database: {
    ipdb: { type: String, default: null, unique: false },
    usuário: { type: String, default: null, unique: false },
    senhadb: { type: String, default: null, unique: false },
    basedb: { type: String, default: null, unique: false },
  },
  moderacao: {
    sugestoeschannel: { type: String, default: null, unique: false },
    logsdiscord: { type: String, default: null, unique: false },
    advChannel: { type: String, default: null, unique: false },
    banchannel: { type: String, default: null, unique: false },
    reportChannel: { type: String, default: null, unique: false },
    backupchannel: { type: String, default: null, unique: false },
    advRole1: { type: String, default: null, unique: false },
    advRole2: { type: String, default: null, unique: false },
    advRole3: { type: String, default: null, unique: false },
    advRole4: { type: String, default: null, unique: false },
  },

});
  
module.exports = {
  Guild: mongoose.model("Guild", Guild),
};