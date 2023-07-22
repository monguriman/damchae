// db/models/forestModel.js
import mongoose from 'mongoose';
import ForestPostSchema from '../schemas/forestPostSchema.js';

const ForestPost = mongoose.model('ForestPost', ForestPostSchema);

const forestModel = {
	getAllPosts: async () => {
		try {
			const posts = await ForestPost.find().populate('postId', 'imageUrl');
			return posts;
		} catch (error) {
			console.error(error);
			throw new Error('포스트 조회에 실패했습니다.');
		}
	},

	getPostById: async (postId) => {
		try {
			const post = await ForestPost.findById(postId).populate(
				'postId',
				'imageUrl',
			);
			return post;
		} catch (error) {
			throw new Error('포스트 조회에 실패했습니다.');
		}
	},

	createPost: async (postData) => {
		try {
			const newPost = await ForestPost.create(postData);
			return newPost;
		} catch (error) {
			console.log(error);
			throw new Error('포스트 생성에 실패했습니다.');
		}
	},

	updatePost: async (postId, title, content) => {
		try {
			const updatedPost = await ForestPost.findByIdAndUpdate(
				postId,
				{ title, content },
				{ new: true }, // 이 옵션을 설정하면 업데이트 된 문서를 반환합니다.
			);
			return updatedPost;
		} catch (error) {
			console.error(error);
			throw new Error('포스트 업데이트에 실패했습니다.');
		}
	},

	deletePost: async (postId) => {
		try {
			const deletedPost = await ForestPost.findByIdAndDelete(postId);
			return deletedPost;
		} catch (error) {
			console.error(error);
			throw new Error('포스트 삭제에 실패했습니다.');
		}
	},
};
export { forestModel };
