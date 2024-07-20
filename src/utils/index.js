const path = require('path');
const {writeFile} = require('fs/promises');
const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { TEMP_DIR, COMMANDS_DIR, PREFIX} = require('../config');
const fs = require('fs');

exports.extractDataFromMessage = (webMessage) => {
    const textMessage = webMessage.message?.conversation;
    const extendedTextMessage = webMessage.message?.extendedTextMessage;
    const extendedTextMessageText = extendedTextMessage?.text;
    const imageTextMessage = webMessage.message?.imageMessage?.caption;
    const videoTextMessage = webMessage.message?.videoMessage?.capition;
    const fullMessage = textMessage || extendedTextMessageText ||imageTextMessage || videoTextMessage;

    if(!fullMessage){
        return{
            remoteJid: null,
            userJid: null,
            prefix: null,
            commandName: null,
            isRaply: null,
            replyJid: null,
            args: [],
        }
    }
    const isReply = !!extendedTextMessage && !!extendedTextMessage.contextInfo?.quotedMessage;
    const replyJid = !!extendedTextMessage && !!extendedTextMessage.contextInfo?.participant
        ? extendedTextMessage.contextInfo.participant
        : null;
    const userJid = webMessage?.key?.participant?.replace(
        /\d/g,
        ""
    );
    const [command, ...args] = fullMessage.split(" ");
    const prefix = command.charAt(0);

    const commandWithoutPrefix = command.replace(new RegExp(`^[${PREFIX}]`), "");
    return{
        remoteJid: webMessage?.key?.remoteJid,
        prefix,
        userJid,
        replyJid,
        isReply,
        commandName: this.formatCommand(commandWithoutPrefix),
        args: this.splitByCharacters(args.join(""), ("\\", "|", "/")),
    };
};

exports.splitByCharacters = (str, characters) => {
    if (!Array.isArray(characters)) {
        characters = characters.split("");
    }
    characters = characters.map((char) => (char === "\\" ? "\\\\" : char));
    const regex = new RegExp(`[${characters.join("")}]`);
    return str
        .split(regex)
        .map((str) => str.trim())
        .filter(Boolean);
};

exports.onlyLetterAndNumber = (text) => {
    return text.replace(/[^a-zA-Z0-9]/g, "");
};

exports.removerAccentsAndSpecialCharacters = (text) => {
    if (!text) return "";

    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

exports.formatCommand = (text) => {
    return this.onlyLetterAndNumber(
        this.removerAccentsAndSpecialCharacters(text.toLocaleLowerCase().trim())
    );
};

exports.baileysIs = (webMessage, context) => {
    return !!this.getContent(webMessage, context);
}
exports.getContent = (webMessage, context) => {
    return (
        webMessage.message?.[`${context}Message`] || 
        webMessage?.message?.extendedTextMessage?.contextInfo?.quotedMessage?.[`${context}Message`]
    );
}

exports.download = async (webMessage, fileName, context, extension) => {
    const content = this.getContent(webMessage, context);
    if (!content){
        return null;
    }

    const stream = await downloadContentFromMessage(content, context);

    let buffer = Buffer.from([]);

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }

    const filePath = path.resolve(TEMP_DIR, `${fileName}.${extension}`);
    await writeFile(filePath, buffer);

    return filePath;
}

exports.findCommandImport = (commandName) => {
    const command = this.readCommandsImports();

    let typeReturn = "";
    let targetCommandReturn = null;

    for (const [type, commands] of Object.entries(command)) {
        if(!command.length) {
            continue;
        }

        const targetCommand = commands.find(cmd => cmd.commands.map(cmd => this.formatCommand(cmd)).includes(commandName));
        if(targetCommand){
            typeReturn = type;
            targetCommandReturn = targetCommand;
            break;
        }
    }
    return {type: typeReturn, command: targetCommandReturn};
};
exports.readCommandsImports = () => {
    const subdirectories = fs
        .readdirSync(COMMANDS_DIR, {withFileTypes: true})
        .filter((directory) => directory.isDirectory())
        .map((directory) => directory.name);
    
    const commandImports = {};

    for (const subdir of subdirectories) {
        const subdirectoryPath = path.join(COMMANDS_DIR, subdir);
        const files = fs
            .readdirSync(subdirectoryPath)
            .filter((file) => !file.startsWith("_") && (file.endsWith(".js") || file.endsWith(".ts")))
            .map(file => require(path.join(subdirectoryPath, file)));
        
        commandImports[subdir] = files;
    }
    return commandImports;
}