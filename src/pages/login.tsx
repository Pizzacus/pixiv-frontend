import { useNavigate } from 'solid-app-router';
import { onMount } from 'solid-js';
import { useUser } from '../components/store';
import TextInput from '../components/text-input';

import API from '../lib/api';

export default function Login() {
	let form: HTMLFormElement = null as any as HTMLFormElement;
	let emailInput: HTMLInputElement = null as any as HTMLInputElement;
	let passwordInput: HTMLInputElement = null as any as HTMLInputElement;

	const navigate = useNavigate();

	onMount(() => {
		const [user, { setToken }] = useUser()!;

		// TODO: Redirect if loged in

		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			const email = emailInput.value;
			const password = passwordInput.value;

			const token = await API.getUserToken(email, password);

			await setToken(token);

			navigate("/");
		});
	})

	return (
		<>
			<section class="bg-gray-100 text-gray-700 py-16 px-32 flex justify-center">
				<form action="" ref={form} class="space-y-4">
					<h1 class="text-2xl font-bold text-center">Log in</h1>

					<div>
						<TextInput type="email" ref={emailInput}>E-mail</TextInput>
					</div>

					<div>
						<TextInput type="password" ref={passwordInput}>Password</TextInput>
					</div>

					<input
						class="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						type="submit"
						value="Submit"
					/>

					<p>
						Don't have an account? 
					</p>
				</form>
			</section>
		</>
	);
}
