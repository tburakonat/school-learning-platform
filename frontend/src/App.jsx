import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AnonymousRoute from "./components/AnonymousRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./pages/Layout";
import AdminDashboardPage from "./pages/AdminDashboard";
import CreatePasswordPage from "./pages/CreateNewPassword";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPassword";
import TeacherDashboardPage from "./pages/TeacherDashboard";
import UserHomePage from "./pages/UserHome";

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
					<Route
						path="/reset-password"
						element={<ResetPasswordPage />}
					/>
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
