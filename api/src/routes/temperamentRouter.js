const { Router } = require("express");
const { temperamentHandler } = require("../handlers/temperamentHandler");

const temperamentRouter = Router();

temperamentRouter.get("/", temperamentHandler);

module.exports = temperamentRouter;
