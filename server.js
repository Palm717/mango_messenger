require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3000;

const cookieParser = require("cookie-parser");
// const socketController = require("./controllers/socket_controller");
const db = require("./config/connection");
const auth_routes = require("./controllers/auth_routes");
const view_routes = require("./controllers/view_routes");
const chat_routes = require("./controllers/chat_routes");
const path = require("path");

const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const sessionMiddleware = session({
  //Required to be used to validate the client cookie matches the session secret
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

//Allow the client to send through json
app.use(express.json());
// Allow the client to send through standard form data
app.use(express.urlencoded({ extended: true }));
//Loads the css to prevent MIME errors
app.use(express.static(path.join(__dirname, 'public')));
//Setup handlebars
app.engine(
  "hbs",
  engine({
    //Enable shortname extensions - ie. index.hbs vs index.handlebars
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
//Set the views folder for all of our handlebar template files
app.set("views", "./views");

app.use(cookieParser());

//Setup the req.session object for our routes
app.use(sessionMiddleware);

app.use("/", [view_routes, auth_routes, chat_routes]);

io.engine.use(sessionMiddleware);

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

io.on("connection", (socket) => {
  socket.on('newuser', (username) => {
    socket.broadcast.emit('update', username + " joined the conversation");
  });
  
  socket.on("chat", (message) => {
    socket.broadcast.emit("chat", message);
  });

  socket.on("exituser", (username) => {
    socket.broadcast.emit("update", username + ' left the conversation');
  });
});

db.sync().then(() => {
  server.listen(PORT, () => console.log("Server started on %s", PORT));
});

// // The code JD gave:

// require("dotenv").config();
// const express = require("express");
// const session = require("express-session");
// const { engine } = require("express-handlebars");
// const { Server } = require("socket.io");
// const PORT = process.env.PORT || 3000;

// const cookieParser = require('cookie-parser');
// // const socketController = require('./controllers/socket_controller');
// const db = require('./config/connection');
// const view_routes = require("./controllers/view_routes");

// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const io = new Server(server);
// const sessionMiddleware = session({
//   //Required to be used to validate the client cookie matches the session secret
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// });

// //Allow the client to send through json
// app.use(express.json());
// // Allow the client to send through standard form data
// app.use(express.urlencoded({ extended: true }));
// //Loads the css to prevent MIME errors
// app.use(express.static("public"));
// //Setup handlebars
// app.engine(
//   "hbs",
//   engine({
//     //Enable shortname extensions - ie. index.hbs vs index.handlebars
//     extname: ".hbs",
//   })
// );
// app.set("view engine", "hbs");
// //Set the views folder for all of our handlebar template files
// app.set("views", "./views");

// app.use(cookieParser());

// //Setup the req.session object for our routes
// app.use(sessionMiddleware);

// app.use('/', view_routes);

// io.engine.use(sessionMiddleware);

// io.on('connection', (socket) => {
//   console.log('socket connected!');

//   socket.on('chat', () => {

//   });
// });

// db.sync().then(() => {
//   server.listen(PORT, () => console.log('Server started on %s', PORT));
// });

// // server.js io listener:
// io.on('connection', (socket) => {
//   console.log('socket connected!');

//   socket.on('chat_message', async (data) => {
//     const user_id = socket.request.session.user_id;
//     const message_text = data.text;

//     const user = await User.findByPk(user_id);

//     const message = await user.createMessage({
//       text: message_text
//     });

//     socket.emit('chat_message', message);
//   });
// });
