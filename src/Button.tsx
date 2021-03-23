import { h, JSX } from "preact";

export interface ButtonProps {
	action: () => void;
	text: string;
}

export default function Button(props: ButtonProps): JSX.Element {
	return (
		<button
			class="bg-indigo-600 text-white p-2 hover:bg-indigo-800"
			onClick={props.action}
		>
			{props.text}
		</button>
	);
}
