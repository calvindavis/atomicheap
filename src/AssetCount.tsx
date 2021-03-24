import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import store from "./store";

export default function AssetCount(): JSX.Element {
	const [count, setCount] = useState(store.getState().assets.length);

	store.subscribe(() => {
		setCount(store.getState().assets.length);
	});

	return (
		<div class="inline-flex w-6 h-6 justify-center items-center bg-indigo-600 font-normal text-xs text-white rounded-full">
			{count}
		</div>
	);
}
