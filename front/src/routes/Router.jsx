import { lazy, Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary'; // Import the ErrorBoundary component from the library

const Home = lazy(() => import('../components/Home/Home'));
const MyPage = lazy(() => import('../components/MyPage/MyPage'));
const InfoChange = lazy(() => import('../components/User/InfoChange'));
const MyStories = lazy(() => import('../components/Stories/MyStories'));
const LoginForm = lazy(() => import('../components/User/Loginform'));
const RegisterForm = lazy(() => import('../components/User/Registerform'));
const StoryRead = lazy(() => import('../components/Stories/StoryRead'));
const DaenamusMain = lazy(() => import('../components/Daenamus/DaenamusMain'));
const DaenamusWrite = lazy(() =>
	import('../components/Daenamus/DaenamusWrite'),
);
const SearchResults = lazy(() => import('../components/Stories/SearchResults'));
const DaenamuRead = lazy(() => import('../components/Daenamus/DaenamuRead'));

const MainLayout = () => {
	return (
		<div className="main-container">
			<ErrorBoundary FallbackComponent={<div>Error...</div>}>
				<Suspense fallback={<div>Loading...</div>}>
					<Outlet />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />

				<Route path="login" element={<LoginForm />} />

				<Route path="register" element={<RegisterForm />} />

				<Route path="mypage" element={<MyPage />} />

				<Route path="infochange" element={<InfoChange />} />

				<Route path="stories" element={<Outlet />}>
					<Route index element={<MyStories />} />
					<Route path=":storyId" element={<StoryRead />} />
					<Route path="search/:searchQuery" element={<SearchResults />} />
				</Route>

				<Route path="daenamus" element={<Outlet />}>
					<Route index element={<DaenamusMain />} />

					<Route path="write" element={<DaenamusWrite />} />

					<Route path=":forestId" element={<DaenamuRead />} />
				</Route>
			</Route>
		</Routes>
	);
};

export default Router;
