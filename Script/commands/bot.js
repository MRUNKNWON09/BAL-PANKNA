const fs = global.nodemodule["fs-extra"];
const moment = require("moment-timezone");

module.exports.config = {
  name: "Obot",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐂𝐘𝐁𝐄𝐑 ☢️_𖣘 -𝐁𝐎𝐓 ⚠️ 𝑻𝑬𝑨𝑴_ ☢️",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};

const responses = {
  "miss you": "আমি তোমাকে রাইতে মিস খাই🥹🤖👅/👅-✘  🎀 🍒:))",
  "😘": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
  "😽": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
  "list": "type /list",
  "help": "type /list",
  "sim": "simsimi কমান্ড এড় নাই টাইপ করুন baby",
  "simsimi": "simsimi কমান্ড এড় নাই টাইপ করুন baby",
  "oi keray": "মধু মধু রসমালাই 🍆⛏️🐸🤣",
  "ওই কিরে": "মধু মধু রসমালাই 🍆⛏️🐸🤣",
  "bc": "SAME TO YOU😊",
  "mc": "SAME TO YOU😊",
  "🫦": "কিরে হালা লুচ্চা, এগুলো কি ইমুজি দেস ।",
  "💋": "কিরে হালা লুচ্চা, এগুলো কি ইমুজি দেস ।",
  "morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
  "good morning": "GOOD MORNING দাত ব্রাশ করে খেয়ে নেও😚",
  "tor ball": "~ তোমার বাল উঠে নাই নাকি তোমার?? 🤖",
  "rafi": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
  "Rafi": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
  "@Rafi Sarker": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
  "রাফি": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
  "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ Rafi ッ ☜\n𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 Rafi.\n𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝 :- https://www.facebook.com/share/1Z5AdKdZcR\nতার সাতে যোগা যোগ করবেন WhatsApp :- +0175570***",
  "ceo": "‎[𝐎𝐖𝐍𝐄𝐑:☞ Rafi ッ ☜\n𝚈𝚘𝚞 𝙲𝚊𝚗 𝙲𝚊𝚕𝚕 𝙷𝚒𝚖 Rafi.\n𝐇𝐢𝐬 𝐅𝐚𝐜𝐞𝐛𝐨𝐨𝐤 𝐢𝐝 :- https://www.facebook.com/share/1Z5AdKdZcR\nতার সাতে যোগা যোগ করবেন WhatsApp :- +0175570***",
  "chup": "তুই চুপ চুপ কর পাগল ছাগল",
  "stop": "তুই চুপ চুপ কর পাগল ছাগল",
  "চুপ কর": "তুই চুপ চুপ কর পাগল ছাগল",
  "chup kor": "তুই চুপ চুপ কর পাগল ছাগল",
  "assalamualaikum": "️- ওয়ালাইকুমুস-সালাম-!!🖤",
  "আসসালামু আলাইকুম": "️- ওয়ালাইকুমুস-সালাম-!!🖤"
};

const randomReplies = [
  "বেশি bot Bot করলে leave নিবো কিন্তু😒😒",
  "শুনবো না😼তুমি আমাকে প্রেম করাই দাও নাই🥺পচা তুমি🥺",
  "আমি আবাল দের সাথে কথা বলি না,ok😒",
  "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈",
  "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋",
  "আমি তোমাকে মিস করি🥹",
  "হ্যালো! কেমন আছো?😎",
  "কি খবর?😏",
  "তুমি কি খেয়েছো?🍔",
  "আমি ব্যস্ত, পরে কথা বলব😅",
  "তোমার নামটা কি সুন্দর!✨",
  "চলো খেলি! 🎮",
  "আজকের দিনটা কেমন কাটল?🌞",
  "আমি বোর হচ্ছি, মজা করো!😂",
  "শুভ রাত্রি!😴",
  "Good night sleep tight!🌙",
  "আমি তোমার সাথে আছি, চিন্তা কোরো না💖",
  "হাসো, জীবন সুন্দর!😄",
  "তোমার মেসেজ পেলাম, ধন্যবাদ📩",
  "চলো গল্প করি, সময় ভালো যাবে📖"
];

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  const threadID = event.threadID;
  const messageID = event.messageID;
  const name = await Users.getNameUser(event.senderID);
  const body = event.body.trim().toLowerCase();

  const time = moment.tz("Asia/Dhaka").format("HH:mm:ss L");

  if (responses[body]) return api.sendMessage(responses[body], threadID, messageID);

  if (body.startsWith("/bot")) {
    const rand = randomReplies[Math.floor(Math.random() * randomReplies.length)];
    return api.sendMessage(`${name}, ${rand}`, threadID, messageID);
  }
};

module.exports.run = function({ api, event, client, __GLOBAL }) { }
