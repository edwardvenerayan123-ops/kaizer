const moment = require('moment-timezone');

module.exports = {
  config: {
    name: "info",
    version: "2.4.70",
    author: "Kaizer",
    countDown: 20,
    role: 0,
    shortDescription: "Owner information command",
    longDescription: "This command provides the bot owner, uptime, and bot details.",
    category: "owner"},

  onStart: async function ({ message }) {
    const config = global.GoatBot.config;
    const ownerName = config.ownerName || "Kaizer";
    const ownerUID = String(config.godUID || config.adminBot?.[0] || "");
    const now = moment().tz('Asia/Manila');
    const date = now.format('MMMM Do YYYY');
    const time = now.format('h:mm:ss A');
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    message.reply({
      body: `
╔═《✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨》═╗

⭓ 🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲   : 『 ${config.nickNameBot} 』
⭓ ☄️ 𝗣𝗿𝗲𝗳𝗶𝘅        : 『 ${config.prefix} 』
⭓ ⚡ 𝗨𝗽𝘁𝗶𝗺𝗲        : 『 ${uptimeString} 』
⭓ 🗓️ 𝗗𝗮𝘁𝗲          : 『 ${date} 』
⭓ ⏰ 𝗧𝗶𝗺𝗲          : 『 ${time} 』
⭓ 👑 𝗢𝘄𝗻𝗲𝗿        : 『 ${ownerName} 』
⭓ 🆔 𝗚𝗼𝗱 𝗨𝗜𝗗       : 『 ${ownerUID} 』
⭓ 🌐 𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸    : 『 https://www.facebook.com/${ownerUID} 』
╚════════════════════╝`
    });
  },

  onChat: async function ({ event, message }) {
    if (event.body && event.body.toLowerCase() === "info") {
      this.onStart({ message });
    }
  }
};
