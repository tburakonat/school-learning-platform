import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import ResetPassword from "./pages/reset-password";
import CreatePassword from "./pages/create-password";
import Layout from "./pages/layout";

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/reset-password" element={<ResetPassword />} />
					<Route
						path="/create-password"
						element={<CreatePassword />}
					/>
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
