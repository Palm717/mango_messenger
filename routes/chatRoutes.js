const express = require("express");
const router = express.Router();

const {
  getChatbyId,
  sendMessage,
  newConvo,
} = require("../controllers/chatControllers");

router.route("/dashboard/newGroupChat").get(newConvo);
router.route("/groupchat/:id").get(getChatbyId);
router.route("/sendmessage").post(sendMessage);

module.exports = router;
