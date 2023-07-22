import forestService from '../services/forestService.js';
import { statusCode } from '../utils/statusCode.js';
import NotFoundError from '../middlewares/error/notFoundError.js';
import BadRequest from '../middlewares/error/badRequest.js';

class forestController {
	static async getAllPosts(req, res, next) {
		try {
			const forestServiceInstance = new forestService();
			const posts = await forestServiceInstance.getAllPosts();
			statusCode.setResponseCode200(res);
			res.send(posts);
		} catch (error) {
			next(error);
		}
	}

	static async getPostById(req, res, next) {
		try {
			const postId = req.params.id;
			const forestServiceInstance = new forestService();
			const post = await forestServiceInstance.getPostById(postId);
			if (!post) {
				throw new NotFoundError('존재하지 않는 글입니다');
			}
			statusCode.setResponseCode200(res);
			res.send(post);
		} catch (error) {
			next(error);
		}
	}

	static async createPost(req, res, next) {
		try {
			// 로그인 상태 확인
			if (!req.currentUser) {
				return res
					.status(400)
					.json({ message: '글을 등록하려면 로그인이 필요합니다.' });
			}

			const user = req.user;
			const { title, content, postDate } = req.body;
			if (!title || !content) {
				console.log(user);
				throw new BadRequest('Title과 content는 필수 입력 사항입니다.');
			}

			if (!user) {
				console.log(user);
				throw new BadRequest('글을 등록하려면 로그인이 필요합니다.');
			}
			const forestServiceInstance = new forestService();
			await forestServiceInstance.createPost({
				title,
				content,
				postDate,
				user,
			});
			statusCode.setResponseCode200(res);
			res.send({ message: '글을 등록했습니다.' });
		} catch (error) {
			console.log(error);
			next(error);
		}
	}

	static async updatePost(req, res, next) {
		try {
			const postId = req.params.id;
			const { title, content } = req.body;
			if (!title || !content) {
				throw new BadRequest('Title과 content는 필수 입력 사항입니다.');
			}
			const forestServiceInstance = new forestService();
			await forestServiceInstance.updatePost(postId, { title, content });
			statusCode.setResponseCode200(res);
			res.send({ message: '글을 수정했습니다.' });
		} catch (error) {
			next(error);
		}
	}

	static async deletePost(req, res, next) {
		try {
			const postId = req.params.id;
			const forestServiceInstance = new forestService();
			await forestServiceInstance.deletePost(postId);
			statusCode.setResponseCode200(res);
			res.send({ message: '글을 삭제했습니다.' });
		} catch (error) {
			next(error);
		}
	}
}

export default forestController;
