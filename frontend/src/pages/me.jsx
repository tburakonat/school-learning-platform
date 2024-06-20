import { useAuth } from "../context/UserContext";

const Me = () => {
	const { user } = useAuth();

	return (
		<div>
			<h1>Hello {user.username}</h1>
		</div>
	);
};

export default Me;
