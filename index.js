require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const options = {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
};
const io = require("socket.io")(server, options);
// const cors = require("cors");

// app.use(cors());

app.get("/", (_, res) => {
  res.json({
    msg: "Server Online",
  });
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id;
  console.log("New User Has Connected ", id, socket.id);
  socket.join(id);

  socket.on("new-data", (datum) => {
    socket.to(id).emit("refreshing-data", datum.datum);
  });
});

server.listen(process.env.PORT, () => {
  console.log("Server is Running at PORT " + process.env.PORT);
});

// const content = require("fs").readFileSync(__dirname + "/index.html", "utf8");

// const httpServer = require("http").createServer((req, res) => {
//   // serve the index.html file
//   res.setHeader("Content-Type", "text/html");
//   res.setHeader("Content-Length", Buffer.byteLength(content));
//   res.end(content);
// });

// const io = require("socket.io")(httpServer);

// io.on("connection", (socket) => {
//   console.log("connect", new Date(Date.now()));
//   //   let counter = 0;
//   //   const interval = setInterval(() => {
//   //     socket.emit("hello", ++counter);
//   //     if (counter === 10) clearInterval(interval);
//   //   }, 1000);
//   socket.on("hey", (data) => {
//     console.log(`hey - ${data.counter}`);
//   });
// });

// httpServer.listen(process.env.PORT, () => {
//   console.log("Server is Running at PORT " + process.env.PORT);
// });
