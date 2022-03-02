import 'windi.css';

import { render } from 'solid-js/web';
import { Router } from 'solid-app-router';
import App from './app';
import { UserProvider } from "./components/store";

render(
	() => (
		<UserProvider>
			<Router>
				<App />
			</Router>
		</UserProvider>
	),
	document.getElementById('root') as HTMLElement,
);
