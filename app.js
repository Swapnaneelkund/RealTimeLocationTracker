
const express=require("express");
const {Server}=require("socket.io");
const path=require("path");
const http=require("http");
const session = require("express-session");
const sharedSession = require("express-socket.io-session");
const app=express();
const server=http.createServer(app);
const io= new Server(server,{
    cors: {
        origin: "*", // Allows all origins, change to specific domains for better security
        methods: ["GET", "POST"]
    }
});
const sessionMiddleware=session({
    saveUninitialized:false,
    resave:false,
    secret:"hey hey"
})
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(sessionMiddleware);
io.use(sharedSession(sessionMiddleware,{autoSave:true}));
app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/",(req,res)=>{
    req.session.username=req.body.username;
    res.redirect("/map")
})
app.get("/map",(req,res)=>{
    if(!req.session.username){
        res.redirect("/")
    }else{
        res.render("index1");
    }
})


io.on("connection",(socket)=>{
    console.log("connected" +socket.id)
    const username=socket.handshake.session.username;
    if(username){
        socket.username=username
        
        console.log("connected" +socket.id)
        socket.on("send-location",(data)=>{
            io.emit("recive-location",{socketID:socket.id,...data,user:socket.username});
        })
        socket.on("disconnect",()=>{
            io.emit("user-disconnected",socket.id);
        })
    }else{
        console.log("user is not authenticated in session")
    }

})
server.listen(3000);

