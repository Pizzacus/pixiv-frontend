import { useNavigate } from 'solid-app-router';
import { onMount } from 'solid-js';

import API from '../lib/api';

export default function Home() {
	let form: HTMLFormElement = null as any as HTMLFormElement;
	let nameInput: HTMLInputElement = null as any as HTMLInputElement;
	let descriptionInput: HTMLTextAreaElement = null as any as HTMLTextAreaElement;
	let fileInput: HTMLInputElement = null as any as HTMLInputElement;

	const navigate = useNavigate();

	onMount(() => {
		form.addEventListener("submit", async (event) => {
			event.preventDefault();

			if (!fileInput.files) return;

			const post = await API.createPost({
				name: nameInput.value,
				description: descriptionInput.value,
				files: [...fileInput.files],
			});

			navigate("/post/" + post.id);
		});
	})

	return (
		<>
			<section class="bg-gray-100 text-gray-700 p-8">
				<h1 class="text-2xl font-bold mb-2">Upload an artwork</h1>
				<form action="" ref={form}>
					<label class="block mb-4">
						Post name<br />
						<input
							class="mt-1 py-2 px-3 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 border block shadow-sm border-gray-300 rounded-md"
							type="text"
							name="text"
							ref={nameInput}
							/>
					</label>

					<label class="block mb-4">
						Description<br />
						<textarea
							name="description"
							class="mt-1 py-2 px-3 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 border block shadow-sm border-gray-300 rounded-md"
							cols="30"
							rows="10"
							ref={descriptionInput}
						></textarea>
					</label>

					<label class="block mb-4">
						Images<br />
						<input
							type="file"
							name="files"
							multiple
							ref={fileInput}
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
