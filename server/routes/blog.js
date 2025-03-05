const express = require("express");
const BlogPost = require("../models/BlogPost");
const router = express.Router();

router.post("/blogs", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newPost = new BlogPost({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
