const { PREFIX } = require("../../config");

module.exports = {
    name: 'Ping',
    description: 'Testa se o bot está on.',
    commands: ["ping"],
    usage: `${PREFIX}ping`,
    handle: async ({sendReact}) => {
        await sendReact("Pong!");
    }
}