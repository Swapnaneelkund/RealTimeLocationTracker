const dotenv =require("dotenv");
dotenv.config();
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const sessionMiddleware = require("./sessionConfig");
const sharedSession = require("express-socket.io-session");
const socketHandler = require("./socketHandler");
const app = express();
const indexRouter =require("./routes/index.js");
const mapRouter = require("./routes/map.js");
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

io.use(sharedSession(sessionMiddleware, { autoSave: true }));

app.use("/", indexRouter);
app.use("/map", mapRouter);

io.on("connection", (socket) => socketHandler(io, socket));

server.listen(process.env.PORT, '0.0.0.0', ()=>{
    console.log(`server running on port ${process.env.PORT}`);
});
