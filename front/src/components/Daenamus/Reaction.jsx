import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getApi } from '../../services/api';
import { textEngToDeepColor, textToKorean } from '../Util/Util';

const ReactionChart = ({ forestId }) => {
	const [reaction, setReaction] = useState('');
	const fetchData = async () => {
		try {
			const res = await getApi(`forest/${forestId}/comments/statistics`);
			console.log(res.data);
			setReaction(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	const mbtiTypes = [
		'ISTJ',
		'ISFJ',
		'INFJ',
		'INTJ',
		'ISTP',
		'ISFP',
		'INFP',
		'INTP',
		'ESTP',
		'ESFP',
		'ENFP',
		'ENTP',
		'ESTJ',
		'ESFJ',
		'ENFJ',
		'ENTJ',
	];

	useEffect(() => {
		fetchData();
	}, []);

	const initialSeries = Object.keys(reaction).map((emotion) => ({
		name: textToKorean[emotion],
		data: mbtiTypes.map((mbtiType) => ({
			x: mbtiType,
			y: reaction[emotion][mbtiType] || 0, // 해당 MBTI 유형에 데이터가 없으면 기본값 0으로 처리합니다.
			fillColor: textEngToDeepColor[emotion], // 적절한 색상을 가져와야 합니다.
		})),
	}));

	const options = {
		legend: {
			show: true,
		},
		chart: {
			height: 350,
			type: 'treemap',
			toolbar: {
				tools: {
					download: false,
				},
			},
		},
		title: {
			text: 'MBTI 유형별 반응',
			align: 'center',
		},
		colors: Object.values(textEngToDeepColor),
	};

	return (
		<div className="m-10">
			<div>
				<ReactApexChart
					options={options}
					series={initialSeries}
					type="treemap"
					height={350}
				/>
			</div>
		</div>
	);
};

export default ReactionChart;
