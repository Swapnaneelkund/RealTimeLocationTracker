
const express=require("express");
const {Server}=require("socket.io");
const path=require("path");
const http=require("http");
const app=express();
const server=http.createServer(app);
const io= new Server(server,{
    cors: {
        origin: "*", // Allows all origins, change to specific domains for better security
        methods: ["GET", "POST"]
    }
});

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.get("/",(req,res)=>{
    res.render("index")
})
io.on("connection",(socket)=>{
    console.log("connected" +socket.id)
    socket.on("send-location",(data)=>{
        io.emit("recive-location",{socketID:socket.id,...data});
    })
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id);
    })
})
server.listen(3080);

