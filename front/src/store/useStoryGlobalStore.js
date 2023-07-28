import { create } from 'zustand';

const useStoryGlobalStore = create((set) => ({
	title: '',
	content: '',
	mood: '',
	music: '',
	phrase: '',
	thumbnail: '',
	localThumbnail: '',
	stableThumbnail: '',
	//TODO:나중에 경로 변경하기

	setTitle: (title) => set({ title }),
	setContent: (content) => set({ content }),
	setThumbnail: (thumbnail) => set({ thumbnail }),
	setLocalThumbnail: (localThumbnail) => set({ localThumbnail }),
	setStableThumbnail: (stableThumbnail) => set({ stableThumbnail }),
	setMood: (mood) => set({ mood }),
	setMusic: (music) => set({ music }),
	setPhrase: (phrase) => set({ phrase }),
}));

export default useStoryGlobalStore;