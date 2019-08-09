const express = require("express");
const DevController = require("./controllers/DevController");
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.json({message:`Ola ${req.query.name}`});
});

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.post("/devs/:devId/likes", LikeController.store);
routes.post("/devs/:devId/dislikes", DislikeController.store);

/*
routes.post('/devs', (req, res) => {
	console.log(req.body);
	return res.json({ok:true});
});
*/

module.exports = routes;