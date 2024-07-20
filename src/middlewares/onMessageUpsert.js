const { dynamicCommands } = require("../utils/dynamicCommands");
const { loadcommonFunctions } = require("../utils/loadcommonFunctions");


exports.onMessagesUpsert = async ({socket, messages}) =>{
    if(!messages.length){
        return;
    }
    const webMessage = messages[0];
    const commonFunctions = loadcommonFunctions({socket, webMessage});

    await dynamicCommands(commonFunctions);
};