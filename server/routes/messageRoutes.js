const express = require("express");
const messageController = require("../controllers/messageController");
const { requireAuth, checkUser } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/chat", checkUser, messageController.chatController);
router.get("/chat", checkUser, messageController.getmessagesController);
router.delete("/chat/delete", requireAuth, checkUser, messageController.deletemessageController);

module.exports = router;