const {DangerError, WarningError, InvalidParameterError} = require('../error');
const { verifyPrefix, hasTypeOrCommand } = require("../middlewares");
const { checkPermission } = require("../middlewares/checkPermission");
const { findCommandImport } = require('.');

exports.dynamicCommands = async (paramsHandler) => {
    const {commandName, prefix, sendWarningReply, sendErrorReply} = paramsHandler;
    const {type, command} = findCommandImport(commandName); 
    if(!verifyPrefix(prefix) || !hasTypeOrCommand({type, command})){
        return;
    }
    if(! await checkPermission({type, ...paramsHandler})){
        return sendWarningReply("Voce não tem permissão para execultar esse comando, fale com um administrador");
    }
    try {
        await command.handle({...paramsHandler, type})
    } catch (error){
        console.log(error);

        if(error instanceof InvalidParameterError){
            await sendWarningReply(`[N.1] ${error.message}`);
        } else if (error instanceof WarningError){
            await sendWarningReply(`[N.2]${error.message}`);
        }else if (error instanceof DangerError){
            await sendErrorReply(`[N.3]${error.message}`)
        }else{
            await sendErrorReply(
                `[N.4], Erro ao execultar o comando ${command.name}! A equipe de desenvolvimento foi notificado

                Detalhes do erro: ${error.message}
                
            `);
        }
    }
};