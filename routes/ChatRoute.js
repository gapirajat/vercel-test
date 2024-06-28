const express = require("express");
const router = express.Router();
const { Chat, User } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// Send a new message
router.post("/send", validateToken, async (req, res) => {
    
  const { message, receiverEmail, senderEmail } = req.body;
  
   console.log(req.body +"This is error");
  try {
    const sender = await User.findOne({ where: { email: senderEmail } });
    const receiver = await User.findOne({ where: { email: receiverEmail } });

    if (!receiver) {
      return res.status(404).json({ error: "Receiver not found" });
    }

    const newMessage = await Chat.create({
      message: message,
      senderId: sender.email,
      receiverId: receiver.email
    });
    res.json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while sending the message" });
  }
});

// Get messages between two users
router.get("/messages", validateToken, async (req, res) => {
  const receiverEmail = req.query.message;
  const senderEmail = req.query.message2;
  console.log(receiverEmail, senderEmail);


  try {
    const messages = await Chat.findAll({
      where: {
        [Op.or]: [
          { senderId: senderEmail, receiverId: receiverEmail },
          { senderId: receiverEmail, receiverId: senderEmail }
        ]
      },
      order: [['createdAt', 'ASC']]
    });
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while retrieving messages" });
  }
});

module.exports = router;
