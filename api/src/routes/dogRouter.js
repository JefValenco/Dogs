const { Router } = require("express");
const {
  getDogHandler,
  getDogHandlerId,
  postDogHandler,
  EndDogHandler,
  UpdateDogHandler,
} = require("../handlers/dogHandler");
const { postValidate } = require("../middlewares/postValidate");

const dogRouter = Router();

dogRouter
  .route("/")
  .get(getDogHandler)
  .post(postValidate, postDogHandler)
  .delete(EndDogHandler)
  .put(UpdateDogHandler);

dogRouter.get("/:id", getDogHandlerId);

module.exports = dogRouter;
