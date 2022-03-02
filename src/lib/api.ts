import ky from "ky";
import { z } from "zod";
import { Post, PostSchema, TokenSchema, UserSchema } from "./types";
import { API_HOST } from "./constants";

const request = ky.extend({
	prefixUrl: API_HOST,
	hooks: {
		beforeRequest: [
			(request) => {
				const token = window.localStorage.getItem("token");

				if (token) {
					request.headers.set("Authorization", "Bearer " + token);
				}
			},
		],
	},
});

const API = {
	async fetchPost(id: string) {
		const res = request(`posts/${id}`);

		return PostSchema.parse(await res.json());
	},
	async fetchPosts({
		user = null,
		after = null,
		before = null,
		limit = 20,
	}: {
		user?: string | null,
		after?: string | null,
		before?: string | null,
		limit?: number
	}): Promise<Post[]> {
		const url = user
			? `users/${user}/posts`
			: "posts";

		const params: Record<string, string> = {};

		if (after) {
			params.after = after;
		}

		if (before) {
			params.before = before;
		}

		params.limit = limit.toString();

		const res = request(url, {
			searchParams: params,
		});

		return z.array(PostSchema).parse(await res.json());
	},
	async getUserToken(email: string, password: string) {
		const res = request.post("users/login", {
			json: {
				email,
				password,
			}
		});

		return TokenSchema.parse(await res.json()).token;
	},
	async createUser({
		email,
		name,
		password,
	}: {
		email: string,
		name: string,
		password: string,
	}) {
		const res = request.put("users", {
			json: {
				email,
				name,
				password,
			}
		});

		return UserSchema.parse(await res.json());
	},
	async fetchUser(id: string) {
		const res = request(`users/${id}`);

		return UserSchema.parse(await res.json());
	},
	async createPost({
		name,
		description,
		files,
	}: {
		name: string
		description: string
		files: Blob[],
	}) {
		const formData = new FormData();

		formData.set("payload_json", JSON.stringify({
			name,
			description,
		}));

		for (const [i, file] of files.entries()) {
			formData.append(`files[${i}]`, file);
		}

		const res = request.post(`posts`, {
			body: formData,
		});

		return PostSchema.parse(await res.json());
	}
}

export default API;
