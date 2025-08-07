// routes/character.js

const express = require("express");
const Post = require("../models/postModel");
// 파일명과 맞춤
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, content, author, isPublished, tags } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: '제목은 필수입니다.' })
        }
        const newPost = new Post({
            title,
            content,
            author,
            isPublished: isPublished ?? false,
            tags
        })
        const savePost = await newPost.save()

        res.status(200).json({ message: '게시글 추가', post: savePost })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})



module.exports = router;
