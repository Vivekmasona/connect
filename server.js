const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let clients = [];

wss.on('connection', (ws) => {
  clients.push(ws);
  ws.on('close', () => {
    clients = clients.filter(client => client !== ws);
  });
});

app.get('/start', (req, res) => {
  const message = JSON.stringify({ action: 'start', time: Date.now() });
  clients.forEach(client => client.send(message));
  res.send('Playback started');
});

// Serve static files from 'public' directory
app.use(express.static('public'));

const listener = server.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
