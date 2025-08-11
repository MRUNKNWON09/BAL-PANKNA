module.exports = {
  config: {
    name: "list",
    credits: "Dipto",
    hasPermssion: 0,
    commandCategory: "General",
    usages: "help",
    version: "1.0.0"
  },

  run: async function ({ api, event }) {
    const helpMessage = 
`📜 Available Commands:

1. /list
   - এই মেসেজ দেখাবে।

2. /sms 017xxxxxxx
   - নির্দিষ্ট নম্বরে SMS পাঠাবে।

3. /call 017xxxxxxx
   - নির্দিষ্ট নম্বরে কল সংক্রান্ত ফিচার।

4. /numinfo 017xxxxxxx
   - নম্বর সম্পর্কে তথ্য দেবে।

5. /tik <your video link>
   - TikTok ভিডিও লিংক নিয়ে ভিও দেবে।

6. /email <example@gmail.com> <Subject> <Message>
   - ইমেইল পাঠাবে API দিয়ে।

👉 Usage: কমান্ডের পরে প্রয়োজনীয় আর্গুমেন্ট দিন।`;

    return api.sendMessage(helpMessage, event.threadID, event.messageID);
  }
};
