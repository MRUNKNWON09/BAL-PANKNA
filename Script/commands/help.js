const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");

module.exports.config = {
    name: "help",
    version: "1.0.5",
    hasPermssion: 0,
    credits: "Rafi",
    description: "FREE SET-UP MESSENGER",
    commandCategory: "system",
    usages: "[Name module or Page]",
    cooldowns: 5,
    envConfig: {
        autoUnsend: true,
        delayUnsend: 20
    }
};

module.exports.languages = {
    en: {
        moduleInfo: "╭──────•◈•──────╮\n |  𝗕𝗮𝗕𝘆 𝗝𝗮𝗻𝗻 𝗖𝗵𝗮𝘁 𝗯𝗼𝘁\n |●𝗡𝗮𝗺𝗲: •—» %1 «—•\n |●𝗨𝘀𝗮𝗴𝗲: %3\n |●𝗗𝗲𝘀𝗰𝗿𝗶p𝘁𝗶𝗼𝗻: %2\n |●𝗖𝗮𝘁𝗲𝗴𝗼𝗿𝘆: %4\n |●𝗪𝗮𝗶𝘁𝗶𝗻𝗴 𝘁𝗶𝗺𝗲: %5 seconds(s)\n |●𝗣𝗲𝗿𝗺𝗶𝘀𝘀𝗶𝗼𝗻: %6\n |𝗠𝗼𝗱𝘂𝗹𝗲 𝗰𝗼𝗱𝗲 𝗯𝘆\n |•—» Rafi «—•\n╰──────•◈•──────╯",
        user: "User",
        adminGroup: "Admin group",
        adminBot: "Admin bot"
    }
};

module.exports.handleEvent = function({ api, event, getText }) {
    const { commands } = global.client;
    const { threadID, messageID, body } = event;
    if (!body || !body.startsWith("help")) return;

    const splitBody = body.trim().split(/\s+/);
    if (splitBody.length === 1 || !commands.has(splitBody[1].toLowerCase())) return;

    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const command = commands.get(splitBody[1].toLowerCase());
    const prefix = threadSetting.PREFIX || global.config.PREFIX;

    return api.sendMessage(
        getText(
            "moduleInfo",
            command.config.name,
            command.config.description,
            `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
            command.config.commandCategory,
            command.config.cooldowns,
            (command.config.hasPermssion === 0) ? getText("user") : (command.config.hasPermssion === 1) ? getText("adminGroup") : getText("adminBot"),
            command.config.credits
        ),
        threadID,
        messageID
    );
};

module.exports.run = async function({ api, event, args, getText }) {
    const { commands } = global.client;
    const { threadID, messageID } = event;
    const threadSetting = global.data.threadData.get(parseInt(threadID)) || {};
    const { autoUnsend, delayUnsend } = global.configModule[this.config.name];
    const prefix = threadSetting.PREFIX || global.config.PREFIX;

    const sendMessageWithImage = async (body, url) => {
        const filePath = path.join(__dirname, `/cache/help.jpg`);
        const response = await axios.get(url, { responseType: "arraybuffer" });
        fs.writeFileSync(filePath, response.data);
        api.sendMessage({ body, attachment: fs.createReadStream(filePath) }, threadID, () => fs.unlinkSync(filePath), messageID);
    };

    // যদি "all" লেখা হয়, সব কমান্ড দেখাবে
    if (args[0] && args[0].toLowerCase() === "all") {
        let msg = "";
        const groups = {};
        for (const cmd of commands.values()) {
            const group = cmd.config.commandCategory;
            if (!groups[group]) groups[group] = [];
            groups[group].push(cmd.config.name);
        }
        for (const g in groups) {
            msg += `❄️ ${g}:\n${groups[g].join(' • ')}\n\n`;
        }
        const text = `✿🄲🄾🄼🄼🄰🄽🄳 🄻🄸🅂🅃✿\n\n${msg}│𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 : │Rafi\n│𝗧𝗢𝗧𝗔𝐋 : ${commands.size}\n`;
        return sendMessageWithImage(text, "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif");
    }

    const command = commands.get(args[0] ? args[0].toLowerCase() : "");
    if (command) {
        const text = getText(
            "moduleInfo",
            command.config.name,
            command.config.description,
            `${prefix}${command.config.name} ${(command.config.usages) ? command.config.usages : ""}`,
            command.config.commandCategory,
            command.config.cooldowns,
            (command.config.hasPermssion === 0) ? getText("user") : (command.config.hasPermssion === 1) ? getText("adminGroup") : getText("adminBot"),
            command.config.credits
        );
        return sendMessageWithImage(text, "https://i.postimg.cc/QdgH08j6/Messenger-creation-C2-A39-DCF-A8-E7-4-FC7-8715-2559476-FEEF4.gif");
    }

    // পেজিং সিস্টেম
    const page = Math.max(1, parseInt(args[0]) || 1);
    const perPage = 10;
    const allCmds = Array.from(commands.keys()).sort();
    const totalPages = Math.ceil(allCmds.length / perPage);
    const slice = allCmds.slice((page - 1) * perPage, page * perPage);
    const msg = slice.map(c => `•—»[ ${c} ]«—•`).join("\n");
    const text = `╭──────•◈•──────╮
│𝗨𝘀𝗲 ${prefix}help [Name?]
│𝗨𝘀𝗲 ${prefix}help [Page?]
│𝗡𝗔𝗠𝗘 𝗢𝗪𝗡𝗘𝗥 : │Rafi
│𝗧𝗢𝗧𝗔𝐋 : [${allCmds.length}]
│📛🄿🄰🄶🄴📛 : [${page}/${totalPages}]
╰──────•◈•──────╯`;
    return sendMessageWithImage(msg + "\n\n" + text, "https://i.ibb.co.com/kg2nPyCM/FB-IMG-1752740397159.jpg");
};
