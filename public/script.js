/* Socket */
const socket = io();

/* Sonido de notificacion */
const notificacion = new Audio("./recursos/notification.mp3");

/* Colores para los usuarios */
const colores = {
  red: "red",
  blue: "blue",
  green: "green",
  purple: "purple",
  orange: "orange",
  lime: "lime",
  brown: "brown",
};

function obtenerColorAleatorio() {
  const claves = Object.keys(colores);
  const indiceAleatorio = Math.floor(Math.random() * claves.length);
  const claveAleatoria = claves[indiceAleatorio];
  return colores[claveAleatoria];
}

/* Formulario de mensajes */
const form = document.getElementById("form");
const input = document.getElementById("input");
const mensajes = document.getElementById("mensajes");

/* Evento para enviar el mensaje */
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    /* Emitir un evento con el alias chat message */
    socket.emit("chat message", {
      mensaje: input.value,
      usuario: "Mub",
      color: obtenerColorAleatorio(),
    });
    input.value = "";
  }
});

/* Agregar mensajes al historial visual */
socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.innerHTML = `<div>
      <b style="color:${msg.color}">${msg.usuario}</b> - <span>${msg.mensaje}</span>
    </div>
  `;

  mensajes.appendChild(item);
  mensajes.scrollTop = mensajes.scrollHeight;
  notificacion.play();
});
