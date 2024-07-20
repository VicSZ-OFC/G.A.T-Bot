const { BOT_EMOJI } = require('../config');
const {extractDataFromMessage, baileysIs, download} = require('.');
const fs = require('fs');

exports.loadcommonFunctions = ({socket, webMessage}) => {
    const {remoteJid, prefix, commandName, args, userJid, isRaply, replyJid} = extractDataFromMessage(webMessage);

    const isImage = baileysIs(webMessage, "image");
    const isVideo = baileysIs(webMessage, "video");
    const isSticke = baileysIs(webMessage, "sticke");

    const downloadImage = async (webMessge, fileName) => {
        return await download(webMessage, fileName, "image", "png");
    };
    const downloadSticker = async (webMessage, fileName) => {
        return await download(webMessage, fileName, "sticke", "webp");
    };
    const downloadVideo = async (webMessage, fileName) => {
        return await download(webMessage, fileName, "video", "mp4");
    };

    const sendText = async (text) => {
        return await socket.sendMessage(remoteJid, {text: `${BOT_EMOJI} ${text}`});
    };
    const sendRaply = async (text) => {
        return await socket.sendMessage(remoteJid, {text: `${BOT_EMOJI} ${text}`}, {quoted: webMessage})
    };
    const sendReact = async (emoji) => {
        return await socket.sendMessage(remoteJid, {
            react:{
                text: emoji,
                key: webMessage.key,
            }
        });
    }
    const sendSuccessReact = async () => {
        return await sendReact(":heavy_check_mark:");
    }
    const sendErrorReact = async () => {
        return await sendReact(":heavy_multiplication_x:");
    }
    const sendWaitReact = async () => {
        return await sendReact(":hourglass:");
    }
    const sendWarningReact = async () => {
        return await sendReact("⚠️");
    }
    const sendSuccessReply = async (text) => {
        await sendSuccessReact();
        return await sendRaply(`:heavy_check_mark: ${text}`);
    }
    const sendErrorReply = async (text) => {
        await sendErrorReact();
        return await sendRaply(`:heavy_multiplication_x: ${text}`);
    }
    const sendWaitReply = async (text) => {
        await sendWaitReact();
        return await sendRaply(`:hourglass: ${text}`);
    }
    const sendWarningReply = async (text) => {
        await sendWarningReact();
        return await sendRaply(`���️ ${text}`);
    }
    const sendStickeFromFile = async (file) => {
        return await socket.sendMessage(remoteJid, {
            sticker: fs.readFileSync(file),
        });
    }
    const sendImageFromFile = async (file) => {
        return await socket.sendMessage(remoteJid, {
            image: fs.readFileSync(file),
        });
    }
    return{
        socket,
        remoteJid,
        prefix,
        commandName,
        args,
        userJid,
        isRaply,
        replyJid,
        isImage,
        isVideo,
        isSticke,
        downloadImage,
        downloadSticker,
        downloadVideo,
        sendText,
        sendRaply,
        sendReact,
        sendSuccessReact,
        sendErrorReact,
        sendWaitReact,
        sendWarningReact,
        sendSuccessReply,
        sendErrorReply,
        sendWaitReply,
        sendWarningReply,
        sendStickeFromFile,
        sendImageFromFile,
    }
    
};

