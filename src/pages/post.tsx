import { useParams } from 'solid-app-router';
import { createResource, createSignal, For, Show, Suspense } from 'solid-js';

import API from '../lib/api';
import { IMAGE_HOST } from '../lib/constants';

export default function Post() {
	const data = useParams();
	console.log(data.id)

	const [post] = createResource(() => API.fetchPost(data.id));
	const [shown, setShown] = createSignal(false);

	return (
		<>
			<section class="bg-gray-100 text-gray-700 p-8">
				<div class="max-w-4xl mx-auto bg-white rounded-md overflow-hidden">
					<Suspense fallback={() => <div>Loading...</div>}>
						<div class="space-y-4">
							<Show when={shown()} fallback={() => (
								<div class="relative">
									<div class="absolute bottom-0 left-0 right-0 text-center bg-gradient-to-b from-transparent to-black/60">
										<button
											onClick={() => setShown(true)}
											class="px-16 py-2 text-black font-bold bg-white rounded-md shadow-md mb-4 mt-8"
										>
											Show more
										</button>
									</div>

									<img
										src={new URL(post()?.images[0]!, IMAGE_HOST).href}
										alt=""
										class="w-full"
									/>
								</div>
							)}>
								<For each={post()?.images}>
									{(image, i) => (
										<img
											src={new URL(image, IMAGE_HOST).href}
											alt=""
											class="w-full"
										/>
									)}
								</For>
							</Show>
						</div>

						<div class="py-8 px-16">
							<h1 class="text-2xl font-bold mb-4">{post()?.name}</h1>
							<p>{post()?.description}</p>
						</div>
					</Suspense>
				</div>
			</section>
		</>
	);
}
