// routes/character.js

const express = require("express");
const Post = require("../models/postModel"); 
// 파일명과 맞춤
const router = express.Router();

router.post('/', async(req,res)=>{
    try {
        const {title, content, author, isPublished, tags} = req.body
        
    } catch (error) {
        
    }
})

module.exports = router;
