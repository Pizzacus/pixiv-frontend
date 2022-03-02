import { createSignal, createContext, useContext, Component, Accessor } from "solid-js";
import API from "../lib/api";
import { User } from "../lib/types";

const UserContext = createContext<UserContextType>();

type UserContextType = [Accessor<User | null>, {
	setToken: (token: string) => Promise<void>,
	clearToken: () => void,
}]

export const UserProvider: Component = (props) => {
	const [user, setUser] = createSignal(null as null | User);

	if (window.localStorage.getItem("token")) {
		fetchUser();
	}

	async function fetchUser() {
		const user = await API.fetchUser("@me");
		setUser(user);
	}

	async function setToken(token: string) {
		window.localStorage.setItem("token", token);

		return fetchUser();
	}

	function clearToken() {
		window.localStorage.removeItem("token");
		setUser(null);
	}

	const store: UserContextType = [
		user,
		{ setToken, clearToken },
	];

	return (
		<UserContext.Provider value={store}>
			{props.children}
		</UserContext.Provider>
	);
}

export function useUser() { return useContext(UserContext); }