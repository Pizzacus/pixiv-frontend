import { z } from "zod";

export const UserSchema = z.object({
	createdAt: z.string(),
	id: z.number(),
	name: z.string(),
	email: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export const PostSchema = z.object({
	author: UserSchema ,
	createdAt: z.string(),
	description: z.string(),
	id: z.number(),
	images: z.array(z.string()),
	name: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const TokenSchema = z.object({
	token: z.string(),
});

export type Token = z.infer<typeof TokenSchema>;
