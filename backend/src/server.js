const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-hkfxi.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);