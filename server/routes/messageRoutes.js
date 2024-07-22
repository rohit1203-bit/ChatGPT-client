const express = require("express");
const messageController = require("../controllers/messageController");
const router = express.Router();

router.post("/chat", messageController.chatController);
router.get("/chat", messageController.getmessagesController);

module.exports = router;