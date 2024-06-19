import Navbar from "../components/navbar";

const Layout = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow flex items-center justify-center bg-gray-100 h-full">
				{children}
			</main>
		</div>
	);
};

export default Layout;
