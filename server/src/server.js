const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

io.on("connection", (socket) => {
    console.log("User connected");
  
    socket.on("send_message", (message) => {
      io.emit("receive_message", message);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });

server.listen(5000, () => {
  console.log("Server running on port 5000");
});