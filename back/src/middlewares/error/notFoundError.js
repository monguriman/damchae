// middlewares/errors/NotFoundError.js

class NotFoundError extends Error {
	status = 404;
	constructor(message = '존재하지 않는 글입니다.') {
		super(message);
		this.name = 'NotFoundError';
	}
}

export default NotFoundError;
