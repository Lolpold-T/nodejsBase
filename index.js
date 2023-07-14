const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4000",
  },
});

const middleware = require("./middleware/index.js");
// app.use(middleware.decodeToken);

const users_routes = require("./routes/users.js");
const sessions_routes = require("./routes/sessions.js");

app.get("/", (req, res) => {
  res.status(200).send("You are connected");
});
app.use(express.json());
app.use("/api/users", users_routes);
app.use("/api/sessions", sessions_routes);

io.on("connection", (socket) => {
  const connections = [];
  for (let [id, socket] of io.of("/").sockets) {
    connections.push({ id });
  }
  console.log(connections);
  socket.on("session", (session) => {
    io.emit("session", session.name + ": " + session.id);
  });

  socket.on("disconnect", (id) => {
    console.log("session disconnected " + id);
  });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

module.exports = app;
