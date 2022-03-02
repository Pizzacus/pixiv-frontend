import { Component, Show } from 'solid-js';
import { Link, useRoutes, useLocation } from 'solid-app-router';

import { routes } from './routes';
import { useUser } from './components/store';

const App: Component = () => {
	const location = useLocation();
	const Route = useRoutes(routes);

	const [user, { clearToken }] = useUser()!;

	return (
		<>
			<nav class="bg-gray-200 text-gray-900 px-4 flex items-center h-12">
				<Link href="/" class="font-bold text-lg px-4 no-underline text-current hover:underline">Pixiv</Link>

				<ul class="contents">
					{/* <li class="py-2 px-4">
						<Link href="/" class="no-underline hover:underline">
							Home
						</Link>
					</li>
					<li class="py-2 px-4">
						<Link href="/about" class="no-underline hover:underline">
							About
						</Link>
					</li>
					<li class="py-2 px-4">
						<Link href="/error" class="no-underline hover:underline">
							Error
						</Link>
					</li> */}

					<li class="text-sm flex items-center space-x-4 ml-auto">
						<Show
							when={user()}
							fallback={() => <>
								<Link href="/register">Register</Link>
								<Link href="/login">Log in</Link>
							</>}
						>
							<Link
								href="/upload"
								class="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-underline"
							>
								Post your work
							</Link>

							<span>{ user()!.name }</span>

							<button
								class="text-blue-600 hover:underline"
								onClick={() => clearToken()}
							>
								Sign out
							</button>
						</Show>
					</li>
				</ul>
			</nav>

			<main>
				<Route />
			</main>
		</>
	);
};

export default App;
