/* Importaciones */
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

/* Instancia de express */
const app = express();

/* Servidor HTTP con Express */
const server = http.createServer(app);

/* Servidor vinculado con el socket */
const io = new Server(server);

app.use(express.static("public"));

/* Eventos */

/*
 * io = Representa el servidor completo.
 * socket = El parametro del callback de io.on('connection'),
 * Representa una conexión específica.
 */

io.on("connection", (socket) => {
  /* Conexion */
  console.log("Un usuario se ha conectado");

  /* Recibir eventos de una conexion con el alias chat message */
  socket.on("chat message", (msg) => {
    console.log("Mensaje recibido:", msg);

    /* Guardar el color del usuario */
    if (!socket.color) {
      socket.color = msg.color;
    } else {
      msg.color = socket.color;
    }

    /* Reenviar eventos a todas las conexiones con alias chat message */
    io.emit("chat message", msg);
  });

  /* Desconexión */
  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado");
  });
});

/* Iniciar el servidor */
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
