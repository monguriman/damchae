import { forestModel } from '../db/models/forestModel.js';
import authMiddleware from '../middlewares/authMiddleware.js';
class forestService {
	async getAllPosts() {
		try {
			const posts = await forestModel.find().populate('postId', 'imageUrl');
			return posts;
		} catch (error) {
			console.log(error);
			throw new Error('포스트 조회에 실패했습니다.');
		}
	}

	async getPostById(postId) {
		try {
			const post = await forestModel.findById(postId).populate('postId');
			return post;
		} catch (error) {
			throw new Error('포스트 조회에 실패했습니다.');
		}
	}

	async createPost(postData) {
		try {
			const newPost = await forestModel.create(postData);
			return newPost;
		} catch (error) {
			console.log(error);
			console.error('포스트 생성 오류:', error);
			throw new Error('포스트 생성에 실패했습니다.');
		}
	}

	async updatePost(postId, updateData) {
		try {
			const updatedPost = await forestModel.findByIdAndUpdate(
				postId,
				updateData,
				{
					new: true,
				},
			);
			return updatedPost;
		} catch (error) {
			console.log(error);
			throw new Error('포스트 업데이트에 실패했습니다.');
		}
	}

	async deletePost(postId) {
		try {
			const deletedPost = await forestModel.findByIdAndDelete(postId);
			if (!deletedPost) {
				throw new Error('존재하지 않는 글입니다.');
			}
			return true;
		} catch (error) {
			console.log(error);
			throw new Error('포스트 삭제에 실패했습니다');
		}
	}
}

export default forestService;
