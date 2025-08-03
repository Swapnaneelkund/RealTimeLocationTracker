module.exports = function(io, socket) {
  const username = socket.handshake.session.username;

  if (!username) {
    console.log("user is not authenticated in session");
    return;
  }

  socket.username = username;

  socket.on("send-location", (data) => {
    io.emit("recive-location", {
      socketID: socket.id,
      ...data,
      user: socket.username
    });
  });

  socket.on("disconnect", () => {
    io.emit("user-disconnected", socket.id);
  });
};
