import { h, JSX } from "preact";

export interface ButtonProps {
	action: () => void;
	disabled?: boolean;
	text: string;
}

export default function Button({
	action,
	disabled,
	text,
}: ButtonProps): JSX.Element {
	return (
		<button
			class="bg-indigo-600 text-white p-2 hover:bg-indigo-800 disabled:bg-indigo-400 disabled:cursor-not-allowed"
			onClick={action}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
