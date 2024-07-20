const { PREFIX } = require("../../config");

module.exports = {
    name: 'Nome do comando',
    description: 'Descrição do comando',
    commands: ['comando1', 'comando2', 'comando3'],
    usage: `${PREFIX}comando`,
    handle: async ({}) => {
        //codigo do comando
    }
}