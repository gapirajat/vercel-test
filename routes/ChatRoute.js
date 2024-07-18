const express = require("express");
const router = express.Router();
const { Chat, User } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Op } = require("sequelize");

// Send a new message .../chat/send?to=1&pid=1
router.post("/send", validateToken, async (req, res) => {
  const to = req.query.to;
  const pid = req.query.pid;
  const { message } = req.body;
  // console.log(to,pid,message)
  
   console.log(req.body +"This is error");
  try {
    //message cannot be sent to self
    if(req.user.id==to) {
      return res.status(500).json({error: "error"})
    }

    const sender = await User.findOne({ where: { uid: req.user.id  } });
    const receiver = await User.findOne({ where: { uid: to } });

    if (!receiver || !sender) {
      return res.status(404).json({ error: "user not found" });
    }

    const newMessage = await Chat.create({
      pid: pid,
      message: message,
      sender: sender.uid,
      receiver: receiver.uid,
    });
    res.json(`Message Sent to`,receiver.name);//send proper response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred while sending the message" });
  }
});

// Get messages between two users
//.../messages/message?of=1&pid=1
router.get("/messages", validateToken, async (req, res) => {
  const receiver = req.query.of;
  const pid = req.query.pid;
  console.log(receiver, pid);


  try {
    const messages = await Chat.findAll({
      where: {
        [Op.or]: [
          { sender: req.user.id, receiver: receiver, pid: pid },
          { sender: receiver, receiver: req.user.id, pid: pid }
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
