const {connect} = require('./connection');
const { load } = require('./load');

async function start() {
    try {
        const socket = await connect();
        load(socket);
    } catch (error) {
        console.error("Error in start function:", error);
    }
}
start();