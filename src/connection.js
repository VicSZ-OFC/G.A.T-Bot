const {makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = require('@whiskeysockets/baileys');
const path = require('path');
const { pino } = require('pino');

exports.connect = async () => {
    const { state, saveCreds } = await useMultiFileAuthState(path.resolve(__dirname, '..', 'assets', 'auth', 'baileys'));
    const {version} = await fetchLatestBaileysVersion();
    const socket = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        version,
        browser:['AxiomMind', '', ''],
        logger: pino({level: "error"}),
        markOnlineOnConnect: true,
    })
    socket.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if(connection === 'close') {
            const shouldReconnect = (lastDisconnect.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Conexção fechada ', lastDisconnect.error, ', reconectando ', shouldReconnect);
            if(shouldReconnect) {
                this.connect()
            }
        } else if(connection === 'open') {
            console.log('Conectado')
        }
    })
    socket.ev.on ('creds.update', saveCreds);
    
    return socket;
};