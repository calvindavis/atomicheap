import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import store from "./store";

export default function AssetCount(): JSX.Element {
	const [count, setCount] = useState(store.getState().assets.length);

	store.subscribe(() => {
		setCount(store.getState().assets.length);
	});

	return (
		<div class="w-10 h-10 flex justify-center items-center bg-indigo-600 text-white text-3xl rounded-full">
			{count}
		</div>
	);
}
