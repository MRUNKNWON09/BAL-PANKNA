module.exports = {
  config: {
    name: "cmdlist",
    credits: "Dipto",
    hasPermssion: 0,
    commandCategory: "General",
    usages: "help",
    version: "1.0.0"
  },

  run: async function ({ api, event }) {
    const helpMessage = 
`📜 Available Commands:

1. /cmdlist
   - এই মেসেজ দেখাবে।

2. /sms 017xxxxxxx
   - SMS BOMBER।

3. /call 017xxxxxxx
   - CALL BOMBER।
   
4. /emailbomb example@gmail.com 10
   - EMAIL BOMBER।
   
5. /numinfo 017xxxxxxx
   - নম্বর সম্পর্কে তথ্য ।

6. /tik <your video link>
   - TikTok ভিডিও লিংক নিয়ে ভিও দেবে।

7. /email <example@gmail.com> <Subject> <Message>
   - EMAIL SPAMMING।

👉 Usage: কমান্ডের পরে প্রয়োজনীয় আর্গুমেন্ট দিন।`;

    return api.sendMessage(helpMessage, event.threadID, event.messageID);
  }
};
