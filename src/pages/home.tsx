import { createResource, For, Suspense } from 'solid-js';

import API from '../lib/api';
import PostItem from '../components/post-item';

export default function Home() {
	const [posts] = createResource(() => API.fetchPosts({}));

	return (
		<>
			<section class="bg-gray-100 text-gray-700 p-8">
				<h1 class="text-2xl font-bold mb-4">Latest artworks</h1>
				<div class="grid grid-cols-6 gap-4">
					<Suspense fallback={() => <div>Loading...</div>}>
						<For each={posts()}>
							{(post, i) => <PostItem {...post} />}
						</For>
					</Suspense>
				</div>
			</section>
		</>
	);
}
