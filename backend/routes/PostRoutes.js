const express = require("express");
const router = express.Router();
const PostModel = require("../models/PostModel");



router.post("/", async (req, ress) => {
//retrieve the data
const {title, tags, html} = req.body;

const newPost = new PostModel({
  title,
  tags,
  html  
});
try{
   const savedPost = await newPost.save();
   ress.json(savedPost); 
   console.log(savedPost);
}
catch(err){
console.log(err);
}
});

router.get("/", async (req, res)=> {
    const posts = await Post.find();
    res.json(posts);
})

router.get("/:id", async (req, res)=> {
    const post = await Post.findById(req.params.id);
    res.json(post);
})

module.exports = router;



