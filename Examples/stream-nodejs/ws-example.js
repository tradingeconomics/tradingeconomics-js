require('dotenv').config();
const WebSocket = require('ws');

const APIKEY = process.env.TE_API_KEY || 'Your_key';
const WS_URL = `wss://stream.tradingeconomics.com/?client=${APIKEY}`;
console.log('WS_URL:', WS_URL);

let keepAliveAt = Date.now();
let ws;
let subscribedTopics = new Set();

function startWebSocket() {
    console.log('🔄 Connecting to WebSocket...');

    ws = new WebSocket(WS_URL);

    ws.on('open', () => {
        console.log('✅ WebSocket connected.');
        keepAliveAt = Date.now();
        subscribedTopics.forEach(topic => subscribeToTopic(topic));
    });

    ws.on('message', (data) => {
        parseMessage(data.toString());
    });

    ws.on('error', (err) => {
        console.error('❌ WebSocket error:', err.message);
    });

    ws.on('close', (code, reason) => {
        console.warn(`⚠️ WebSocket closed. Code: ${code}, Reason: ${reason}`);
        restartProcess(':connection_closed');
    });
}

function parseMessage(message) {
    try {
        const quote = JSON.parse(message);

        if (quote.topic === 'keepalive') {
            keepAliveAt = Date.now();
            console.log('💙 Keep-alive received.');
        } else {
            console.log('📩 Message:', JSON.stringify(quote));
        }
    } catch (err) {
        console.warn('⚠️ Failed to parse message:', err);
    }
}

function subscribeToTopic(topic) {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
        console.log('⚠️ WebSocket not ready. Cannot subscribe.');
        return;
    }

    const msg = JSON.stringify({ topic: 'subscribe', to: topic });
    ws.send(msg);
    subscribedTopics.add(topic);
    console.log(`📡 Subscribed to: ${topic}`);
}

function restartProcess(reason) {
    console.log(`🔄 Restarting WebSocket due to ${reason}...`);

    if (ws && ws.readyState !== WebSocket.CLOSED) {
        ws.close();
    }

    setTimeout(startWebSocket, 3000);
}

// Monitor keep-alive every 10 seconds
setInterval(() => {
    if (Date.now() - keepAliveAt > 2 * 60 * 1000) {
        console.log('⏳ No keep-alive in 2 minutes. Restarting...');
        restartProcess(':keep_alive_exit');
    }
}, 10 * 1000);

// Start the connection
startWebSocket();

// Initial topic subscriptions
setTimeout(() => {
    subscribeToTopic('INDU:IND');
    subscribeToTopic('SPX:IND');
    subscribeToTopic('US100:IND');
}, 5000);
