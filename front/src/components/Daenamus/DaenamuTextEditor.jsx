import { useRef, useMemo } from 'react';
import { Editor } from '@toast-ui/react-editor';
import { postApi } from '../../services/api';
import useImageUpload from '../../hooks/useImageUpload';
import useForestStore from '../../store/useForestStore';
import { textToIcon, textToKorean } from '../Util/Util';

const DaenamuTextEditor = () => {
	const {
		title,
		content,
		mood,

		setTitle,
		setMood,

		setContent,
	} = useForestStore();

	const handleSubmit = async () => {
		try {
			const response = await postApi('forest/senti-predict', { content });

			console.log(response);
			setMood(response.data.mood);
		} catch (error) {
			console.log(error);
		}
	};

	const editorRef = useRef();

	const onChange = () => {
		const body = editorRef.current.getInstance().getHTML();
		setContent(body);
	};

	const { handleImageUpload, loading } = useImageUpload();

	return (
		<>
			<h3 className="font-semibold">제목</h3>
			<input
				className="my-5 w-1/2 border"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
				type="text"
				id="title"
				value={title}
			/>
			<h3 className="font-semibold">본문</h3>
			<div className="text-editor">
				<div className="mt-5">
					<Editor
						initialValue={content}
						placeholder="내용을 입력하세요."
						previewStyle="vertical"
						previewHighlight={false}
						height="400px"
						initialEditType="wysiwyg"
						language="ko-KR"
						toolbarItems={[
							// 툴바 옵션 설정
							['bold', 'italic', 'strike'],
							['hr', 'quote'],
							['ul', 'ol', 'task', 'indent', 'outdent'],
							['table', 'image', 'link'],
						]}
						ref={editorRef}
						onChange={onChange}
						hooks={{
							addImageBlobHook: handleImageUpload,
						}}
					/>
				</div>

				{loading && <div>이미지 업로드 중...</div>}
				<div className="flex flex-col space-y-2">
					<div className="justify-end flex flex-row space-x-2">
						{mood && (
							<div className="text-lg">
								게시글 분석 결과 : {textToKorean[mood]}
								{textToIcon[mood]}
							</div>
						)}
						<div className="flex flex-col">
							<button
								onClick={handleSubmit}
								disabled={content?.length <= 16}
								className="w-40 h-8 bg-blue-700 disabled:bg-neutral-300 text-white font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
							>
								감정 분석하기
							</button>
							{content?.length <= 16 && (
								<p className="text-right text-red-400 text-sm mt-2">
									10자 이상 입력해주세요.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default DaenamuTextEditor;
