require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { engine } = require("express-handlebars");
const sequelize = require("sequelize");
const { Server } = require("socket.io");
const PORT = process.env.PORT || 3001;

// const listeners = server.listeners("request").slice(0);
const view_routes = require("./controllers/view_routes");
const db = require("./config/connection");

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
app.use(express.static("public"));

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

//Setup the req.session object for our routes
app.use(sessionMiddleware);

app.use("/", view_routes);

io.engine.use(sessionMiddleware);

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.request.session);
  socket.on("chat message", (msg) => {
    socket.emit("chat message", msg);
  });
  // When a user disconnects a message should print in the console
  socket.on("disconnect", (msg) => {
    console.log("A user disconnected");
  });
});

//Load all of our routes at the root

db.sync().then(() => {
  server.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
});

// Message appears in the console once a user Logs in
