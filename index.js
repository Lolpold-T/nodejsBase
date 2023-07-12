const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const connections = [];
  for (let [id, socket] of io.of("/").sockets) {
    connections.push({ id });
  }
  console.log(connections);
  socket.on("chat message", (user) => {
    io.emit("chat message", user.user + ": " + user.message);
  });

  socket.on("disconnect", (id) => {
    console.log("user disconnected " + id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
