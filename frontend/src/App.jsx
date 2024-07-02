import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AnonymousRoute from "./components/AnonymousRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./pages/layout";
import AdminDashboardPage from "./pages/admin-dashboard";
import CreatePasswordPage from "./pages/create-new-password";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import NotFoundPage from "./pages/not-found";
import RegisterPage from "./pages/register";
import ResetPasswordPage from "./pages/reset-password";
import TeacherDashboardPage from "./pages/teacher-dashboard";
import UserHomePage from "./pages/user-home";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/login"
						element={
							<AnonymousRoute>
								<LoginPage />
							</AnonymousRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<AnonymousRoute>
								<RegisterPage />
							</AnonymousRoute>
						}
					/>
					<Route
						path="/me"
						element={
							<ProtectedRoute
								roles={["student", "teacher", "admin"]}
							>
								<UserHomePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/teacher-dashboard"
						element={
							<ProtectedRoute roles={["teacher"]}>
								<TeacherDashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin-dashboard"
						element={
							<ProtectedRoute roles={["admin"]}>
								<AdminDashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route path="/reset-password" element={<ResetPasswordPage />} />
					<Route
						path="/create-password/:token"
						element={<CreatePasswordPage />}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
				<Toaster position="bottom-center" />
			</Layout>
		</Router>
	);
}

export default App;
