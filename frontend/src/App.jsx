import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/login";
import ResetPassword from "./pages/ResetPassword";
import CreatePassword from "./pages/CreateNewPassword";
import Layout from "./pages/Layout";
import AnonymousRoute from "./components/AnonymousRoute";
import Me from "./pages/Me";
import ProtectedRoute from "./components/protected-route";
import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/login"
						element={
							<AnonymousRoute>
								<Login />
							</AnonymousRoute>
						}
					/>
					<Route
						path="/register"
						element={
							<AnonymousRoute>
								<Register />
							</AnonymousRoute>
						}
					/>
					<Route
						path="/me"
						element={
							<ProtectedRoute
								roles={["student", "teacher", "admin"]}
							>
								<Me />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/teacher-dashboard"
						element={
							<ProtectedRoute roles={["teacher"]}>
								<TeacherDashboard />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/admin-dashboard"
						element={
							<ProtectedRoute roles={["admin"]}>
								<AdminDashboard />
							</ProtectedRoute>
						}
					/>
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route
						path="/create-password/:token"
						element={<CreatePassword />}
					/>
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Toaster position="bottom-center" />
			</Layout>
		</Router>
	);
}

export default App;
