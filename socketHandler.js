const users = {}; 

module.exports = function (io, socket) {
  const username = socket.handshake.session.username;

  if (!username) {
    console.log("User is not authenticated in session");
    return;
  }

  socket.username = username;

  for (const [id, data] of Object.entries(users)) {
    if (id !== socket.id) {
      socket.emit("recive-location", {
        socketID: id,
        ...data,
      });
    }
  }

  socket.on("send-location", (data) => {
    users[socket.id] = {
      ...data,
      user: socket.username,
    };

    io.emit("recive-location", {
      socketID: socket.id,
      ...data,
      user: socket.username,
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("user-disconnected", socket.id);
  });
};
