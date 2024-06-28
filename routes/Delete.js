const { Post } = require("../models");
const express = require("express");
const router = express.Router();

router.delete("/deletepost/:id", async (req, res) => {
    const postId = req.params.id;
  
    try {
      // Find the post by id
      const post = await Post.findOne({ where: { id: postId } });
  
      if (!post) {
        return res.status(404).json({ error: "Post not found!" });
      }
  
      // Delete the post
      await Post.destroy({ where: { id: postId } });
      res.json("Post deleted successfully!");
    } catch (error) {
      res.status(500).json({ error: "An error occurred while deleting the post!" });
    }
  });