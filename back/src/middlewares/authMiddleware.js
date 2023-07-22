// authMiddleware.js (미들웨어: JWT 검증)
import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
	const token = req.header('Authorization');
	if (!token) {
		return res.status(400).json({ message: '로그인이 필요합니다.' });
	}

	try {
		const secretKey = process.env.JWT_SECRET_KEY || 'default-secret-key';
		const decoded = jwt.verify(token.split(' ')[1], secretKey);
		req.user = decoded;
		next();
	} catch (err) {
		return res.status(400).json({ message: '유효하지 않은 토큰입니다.' });
	}
}

export default authMiddleware;
