import { Component } from "solid-js";

let increment = 0;

const TextInput: Component<{ref?: any, type: string }> = (props) => {
	const id = "text-input_" + Math.random().toString(36).slice(2) + "_" + increment;
	increment++;
	return (
		<>
			<label class="inline-block font-bold" for={id}>{props.children}</label>
			<input
				class="mt-1 py-2 px-3 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 border block shadow-sm border-gray-300 rounded-md"
				type={props.type}
				ref={props.ref}
				id={id}
			/>
		</>
	)
}

export default TextInput;