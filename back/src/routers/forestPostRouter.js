import express from 'express';
import forestController from '../controllers/forestController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// 글 전체 조회
router.get('/', forestController.getAllPosts);

// 글 단일 조회
router.get('/:id', forestController.getPostById);

// 글 등록
router.post('/', authMiddleware, forestController.createPost);

// 글 수정
router.put('/:id', forestController.updatePost);

// 글 삭제
router.delete('/:id', forestController.deletePost);

export default router;
