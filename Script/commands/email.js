const axios = require("axios");

module.exports = {
  config: {
    name: "email",
    credits: "Dipto",
    hasPermssion: 0,
    commandCategory: "Information",
    usages: "email <email> <subject> <message>",
    version: "1.0.0"
  },
  run: async function ({ api, event, args }) {
    if (args.length < 3)
      return api.sendMessage(
        "⚠️ দয়া করে ইমেইল, সাবজেক্ট এবং মেসেজ দিন!\nUsage: email <email> <subject> <message>",
        event.threadID,
        event.messageID
      );

    const email = args[0];
    const subject = encodeURIComponent(args[1]);
    const message = encodeURIComponent(args.slice(2).join(" "));

    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    try {
      let url = `https://email-spamming.vercel.app/api?email=${email}&subject=${subject}&message=${message}`;
      let { data } = await axios.get(url);

      let reply = data.message || "Response received";
      api.sendMessage(reply, event.threadID, event.messageID);
    } catch (e) {
      api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
      console.log(e);
    }
  }
};
