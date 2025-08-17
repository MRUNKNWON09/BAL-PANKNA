const axios = require("axios");

// ইউজার cooldown মেমোরি
const cooldowns = new Map();

module.exports = {
  config: {
    name: "tik",
    credits: "Dipto",
    hasPermssion: 0,
    commandCategory: "Downloader",
    usages: "tik <video_link>",
    version: "1.1.0"
  },

  run: async function ({ api, event, args }) {
    const userID = event.senderID;
    const now = Date.now();
    const cooldownAmount = 20 * 60 * 1000; // ২০ মিনিট মিলিসেকেন্ডে

    // চেক করো ইউজার cooldown এ আছে কিনা
    if (cooldowns.has(userID)) {
      const expirationTime = cooldowns.get(userID) + cooldownAmount;
      if (now < expirationTime) {
        const remaining = Math.ceil((expirationTime - now) / 60000);
        return api.sendMessage(`⏳ দুঃখিত, আপনি ${remaining} মিনিট পরে আবার চেষ্টা করতে পারবেন।`, event.threadID, event.messageID);
      }
    }

    if (!args[0]) 
      return api.sendMessage("⚠️ দয়া করে একটি TikTok ভিডিও লিংক দিন!\nUsage: tik <video_link>", event.threadID, event.messageID);

    const link = args[0];
    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    try {
      const url = `https://api-store.top/tik.php?link=${encodeURIComponent(link)}`;
      const { data } = await axios.get(url);

      if (data.Status && data.Status.toLowerCase() === "success") {
        let msg = 
          `✅ Status: ${data.Status}\n` +
          `🆔 Order ID: ${data["Order ID"]}\n` +
          `🔗 Link: ${data.Link}\n` +
          `🔢 Quantity: ${data.Quantity}\n` +
          `👤 API Owner: ${data["API Owner"]}`;
        
        api.sendMessage(msg, event.threadID, event.messageID);
        // cooldown সেট করো
        cooldowns.set(userID, now);
      } else {
        api.sendMessage("❌ API থেকে সফল তথ্য পাওয়া যায়নি।", event.threadID, event.messageID);
      }
    } catch (err) {
      api.sendMessage(`❌ Error: ${err.message}`, event.threadID, event.messageID);
      console.log(err);
    }
  }
};
