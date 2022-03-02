import { useNavigate } from 'solid-app-router';
import { onMount } from 'solid-js';
import { useUser } from '../components/store';

import API from '../lib/api';

export default function Register() {
	let form: HTMLFormElement = null as any as HTMLFormElement;
	let nameInput: HTMLInputElement = null as any as HTMLInputElement;
	let emailInput: HTMLInputElement = null as any as HTMLInputElement;
	let passwordInput: HTMLInputElement = null as any as HTMLInputElement;

	const navigate = useNavigate();

	onMount(() => {
		const [user, { setToken }] = useUser()!;

		// TODO: Redirect if loged in

		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			const name = nameInput.value;
			const email = emailInput.value;
			const password = passwordInput.value;

			const user = await API.createUser({ name, email, password });
			const token = await API.getUserToken(email, password);

			await setToken(token);

			navigate("/");
		});
	})

	return (
		<>
			<section class="bg-gray-100 text-gray-700 p-8">
				<h1 class="text-2xl font-bold mb-2">Register</h1>
				<form action="" ref={form}>
					<label class="block mb-4">
						Name<br />
						<input
							class="mt-1 py-2 px-3 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 border block shadow-sm border-gray-300 rounded-md"
							type="text"
							name="text"
							ref={nameInput}
						/>
					</label>

					<label class="block mb-4">
						E-mail<br />
						<input
							class="mt-1 py-2 px-3 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 border block shadow-sm border-gray-300 rounded-md"
							type="email"
							name="email"
							ref={emailInput}
						/>
					</label>

					<label class="block mb-4">
						Password<br />
						<input
							class="mt-1 py-2 px-3 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 border block shadow-sm border-gray-300 rounded-md"
							type="password"
							name="password"
							ref={passwordInput}
						/>
					</label>

					<input
						class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						type="submit"
						value="Submit"
					/>
				</form>
			</section>
		</>
	);
}
