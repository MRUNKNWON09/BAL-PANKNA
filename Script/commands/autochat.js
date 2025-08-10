const axios = require("axios");

module.exports = {
  config: {
    name: "autochat",
    credits: "Dipto",
    hasPermssion: 0,
    commandCategory: "No command needed",
    usages: "",
    version: "1.0.5"
  },

  handleEvent: async function ({ api, event }) {
    try {
      const text = event.body?.trim();
      if (!text) return;

      // যদি মেসেজ / দিয়ে শুরু হয়, তাহলে কিছু করবে না
      if (text.startsWith("/")) return;

      // নতুন API কল
      const url = `https://cyber-simsimi.onrender.com/simsimi?text=${encodeURIComponent(text)}`;
      const { data } = await axios.get(url);

      // শুধু API রেসপন্সের "response" অংশ পাঠাবে
      let reply = data.response || "❌ No response";

      api.sendMessage(reply, event.threadID, event.messageID);
    } catch (err) {
      api.sendMessage(`❌ Error: ${err.message}`, event.threadID, event.messageID);
      console.log(err);
    }
  },

  run: () => {}
};
