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
import Dashboard from "./pages/Dashboard";
import UserSettings from "./pages/UserSettings";
import CourseList from "./pages/CourseList";
import LectureList from "./pages/LectureList";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute
								roles={["student", "teacher", "admin"]}
							>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/teacher/users"
						element={
							<ProtectedRoute roles={["teacher"]}>
								<TeacherDashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin/users"
						element={
							<ProtectedRoute roles={["admin"]}>
								<AdminDashboardPage />
							</ProtectedRoute>
						}
					/>
					<Route path="/courses" element={<CourseList />} />
					<Route
						path="/courses/:courseId/lectures"
						element={<LectureList />}
					/>

					{/* User Account Management Related Pages  */}
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
								<UserSettings />
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
