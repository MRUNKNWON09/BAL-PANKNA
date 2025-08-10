const axios = require("axios");

module.exports = {
  config: {
    name: "autochat",
    credits: "Dipto",
    hasPermssion: 0,
    commandCategory: "No command needed",
    usages: "",
    version: "1.0.1"
  },

  handleEvent: async function ({ api, event }) {
    try {
      const text = event.body?.trim();
      if (!text) return;

      const url = `https://chatgpt.apinepdev.workers.dev/?question=${encodeURIComponent(text)}`;
      const { data } = await axios.get(url);

      let reply = data.answer || "❌ No response";

      // শেষের community link অংশ মুছে ফেলো
      reply = reply.replace(/\n\n🔗 Join our community:.*$/s, "").trim();

      api.sendMessage(reply, event.threadID, event.messageID);
    } catch (err) {
      api.sendMessage(`❌ Error: ${err.message}`, event.threadID, event.messageID);
      console.log(err);
    }
  },

  run: () => {}
};
