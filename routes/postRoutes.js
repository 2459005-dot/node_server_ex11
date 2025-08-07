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

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json({ message: '전체 게시글 조회', posts })
    } catch (error) {
        res.status(500).json({ message: "서버 오류" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findById(postId)

        if (!post) {
            res.status(404).json({ message: '게시글 없음' })
        }

        res.status(200).json({ message: '게시글 조회', post })
    } catch (error) {
        res.status(500).json({ message: "서버 오류" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { title, content, author, isPublished, tags } = req.body
        if (!title || !content) {
            return res.status(400).json({ message: '제목과 내용은 필수입력' })
        }
        const updatePost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                author,
                isPublished,
                tags
            },
            {
                new: true,
                runValidators: true
            })
        if (!updatePost) {
            res.status(404).json({ message: '게시글 없음' })
        }
        res.status(200).json({ message: '캐릭터 수정', post: updatePost })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findByIdAndDelete(postId)

        if (!post) {
            res.status(404).json({ message: '게시글 없음' })
        }

        res.status(200).json({ message: '게시글 삭제', post })
    } catch (error) {
        res.status(500).json({ message: '서버 오류', error })
    }
})

module.exports = router;
