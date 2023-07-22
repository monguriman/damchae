import mongoose from 'mongoose';

const { Schema } = mongoose;

const ForestPostSchema = new Schema(
	{
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		imageUrl: {
			type: String,
			required: false,
		},
		title: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		views: {
			type: Number,
			default: 0,
		},
		numId: {
			type: Number,
			default: 1, // 기본값 1로 설정
			validate: {
				validator: function (value) {
					return value >= 1 && Number.isInteger(value);
				},
				message: 'numId는 1 이상의 양의 정수여야 합니다.',
			},
		},
		postDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true, collection: 'forestPosts' },
);
// pre hook 추가

export default ForestPostSchema;
