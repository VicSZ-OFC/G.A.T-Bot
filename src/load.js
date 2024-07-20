const {TIMEOUT_IN_MILLESECONDS_BY_EVENT} = require('./config');
const {onMessagesUpsert} = require('./middlewares/onMessageUpsert');

exports.load = (socket) => {
    socket.ev.on('messages.upsert', ({messages}) => {
        setTimeout(() => {
            onMessagesUpsert({socket, messages});
        }, TIMEOUT_IN_MILLESECONDS_BY_EVENT)
    })
}