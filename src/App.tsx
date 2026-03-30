import { Navigate, Route, Routes } from "react-router-dom"
import LoadingPage from "./components/LoadingPage"
import { useGlobal } from "./global-context/global"
import GoogleAuthCallback from "./callbacks/GoogleAuthCallback"
import LoginPage from "./pages/login/LoginPage"
import HomePage from "./pages/home/HomePage"
import DocumentSearchPage from "./pages/document-search/DocumentSearchPage"
import MainLayout from "./layouts/main/MainLayout"
import ProfilePage from "./pages/profile/ProfilePage"

function App() {
	const { isAppLoaded, user } = useGlobal()

	if (!isAppLoaded) {
		return <LoadingPage />
	}

	if (!user) {
		return (
			<div className="w-full h-dvh">
				<Routes>
					<Route path="/login" element={<LoginPage />} />
					<Route path="/auth/google/callback" element={<GoogleAuthCallback />} />
					<Route path="*" element={<Navigate to="/login" replace />} />
				</Routes>
			</div>
		)
	}

	return (
		<div className="w-full h-dvh">
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/search" element={<DocumentSearchPage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Route>
			</Routes>
		</div>
	)
}

export default App
