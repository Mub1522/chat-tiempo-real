# Explicación de `server.js`

Este archivo define un servidor con Node.js, Express y Socket.IO, permitiendo manejar tanto solicitudes HTTP como conexiones WebSocket en tiempo real.

## Contenido del Archivo

### 1. **Importación de Dependencias**
```javascript
const express = require('express'); // Framework para manejar rutas
const http = require('http'); // Módulo nativo de Node.js para crear servidores HTTP
const { Server } = require('socket.io'); // Biblioteca para manejar WebSockets
```

- **`express`**: Simplifica la creación de servidores HTTP y manejo de rutas.
- **`http`**: Base del servidor HTTP.
- **`{ Server }`**: Clase de Socket.IO que permite integrar WebSockets en el servidor.

---

### 2. **Configuración del Servidor HTTP**
```javascript
const app = express();
const server = http.createServer(app);
const io = new Server(server);
```
- **`app`**: Instancia de Express que maneja rutas HTTP.
- **`server`**: Servidor HTTP que utiliza Express para manejar solicitudes.
- **`io`**: Instancia de Socket.IO vinculada al servidor HTTP.

---

### 3. **Configuración de Archivos Estáticos**
```javascript
app.use(express.static('public'));
```

- **`express.static('public')`**: Permite servir archivos estáticos como HTML, CSS, e imágenes desde la carpeta `public`.
- Por ejemplo, `index.html` en `public/` estará disponible en `http://localhost:3000/`.

---

### 4. **Manejo de Conexiones WebSocket**
```javascript
io.on('connection', (socket) => {
  console.log('Un cliente se conectó');

  socket.on('chat message', (msg) => {
    console.log('Mensaje recibido:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('Un cliente se desconectó');
  });
});
```
- **`io.on('connection', callback)`**: Detecta nuevas conexiones de clientes.
  - Cada cliente conectado genera un objeto `socket` que representa su conexion especifica y unica.
- **`socket.on('chat message', callback)`**: Escucha eventos `chat message` enviados por el cliente especifico.
- **`io.emit('chat message', msg)`**: Emite el mensaje a todos los clientes conectados al servidor.
- **`socket.on('disconnect', callback)`**: Detecta cuando un cliente se desconecta del servidor.

---

### 5. **Iniciar el Servidor**
```javascript
const PORT =  3000;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
```
- **`3000`**: Puerto por defecto (puede variar si es necesario).
- **`server.listen(PORT, callback)`**: Inicia el servidor y ejecuta el callback al arrancar que imprime un mensaje en consola.

---

## Relación entre Componentes

| Componente       | Funcionalidad                                    |
|------------------|--------------------------------------------------|
| **Express (`app`)** | Manejo de rutas y archivos estáticos             |
| **HTTP (`server`)**  | Manejo de solicitudes y conexiones del web socket      |
| **Socket.IO (`io`)** | Comunicación en tiempo real con WebSockets      |

---

## Flujo Simplificado

1. **Cliente** se conecta al servidor usando WebSockets.
2. El servidor detecta la conexión y asigna un `socket`.
3. Los clientes pueden:
   - **Enviar mensajes** al servidor usando `socket.emit`.
   - **Escuchar eventos** desde el servidor con `socket.on`.
4. El servidor puede:
   - Enviar mensajes a **todos los clientes** usando `io.emit`.
   - Escuchar eventos con de un cliente con `socket.on`.

---

## Ejemplo de Flujo de Mensajes

1. Cliente envía un mensaje:
   ```javascript
   socket.emit('chat message', 'Hola a todos!');
   ```

2. Servidor recibe el mensaje:
   ```javascript
   socket.on('chat message', (msg) => {
     console.log('Mensaje recibido:', msg);
     io.emit('chat message', msg);
   });
   ```

3. Todos los clientes reciben el mensaje:
   ```javascript
   socket.on('chat message', (msg) => {
     console.log('Nuevo mensaje:', msg);
   });
   ```

---