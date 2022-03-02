import { Link } from 'solid-app-router';
import { Post } from '../lib/types';
import { IMAGE_HOST } from '../lib/constants';

export default function PostItem(props: Post) {
	return (
		<Link href={`/post/${props.id}`} class="no-underline text-current group">
			<img
				class="w-full aspect-square rounded-md object-cover bg-gray-200 border-none group-hover:opacity-75 mb-2"
				src={new URL(props.images[0], IMAGE_HOST).href}
				alt=""
			/>
			<h2 class="font-bold group-hover:underline">{props.name}</h2>
			<p>{props.author.name}</p>
		</Link>
	)
}