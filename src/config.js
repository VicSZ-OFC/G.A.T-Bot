const path = require('path');

exports.BOT_EMOJI = "🤖";
exports.BOT_NAME = "G.A.T Bot";
exports.PREFIX = "!";
exports.BOT_NUMBER = "+33757055211";

exports.COMMANDS_DIR = path.resolve(__dirname, 'commands');
exports.TIMEOUT_IN_MILLESECONDS_BY_EVENT = 500;
exports.TEMP_DIR = path.resolve(__dirname, '..', 'assets', 'temp');
exports.OPENAI_API_KEY = "#";