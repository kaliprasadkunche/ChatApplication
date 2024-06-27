// backend/websocket.js
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const Message = require('./models/Message');
const User = require('./models/User');

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
    const token = req.url.split('?token=')[1];
    if (!token) {
      ws.close();
      return;
    }

    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId;
    } catch (error) {
      ws.close();
      return;
    }

    ws.on('message', async (message) => {
      const msg = JSON.parse(message);
      const user = await User.findById(userId);
      if (!user) {
        ws.close();
        return;
      }

      const newMessage = new Message({ text: msg.text, sender: user.username, timestamp: new Date() });
      await newMessage.save();

      const broadcastMessage = JSON.stringify({ text: msg.text, sender: user.username, timestamp: newMessage.timestamp });
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(broadcastMessage);
        }
      });
    });
  });
};
