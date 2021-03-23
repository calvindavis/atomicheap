import { h, JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import store from "./store";
import { addAsset, clearAssets, removeAsset } from "./AssetManager";
import Button from "./Button";

export default function App(): JSX.Element {
	const [assets, setAssets] = useState(store.getState().assets);

	store.subscribe(() => {
		const newAssets = store.getState().assets;
		setAssets([...newAssets]);
	});

	return (
		<div>
			<h1>AtomicHeap</h1>
			<div>
				<Button
					action={() => {
						addAsset("Testing");
					}}
					text="Add asset"
				/>
				<Button
					action={() => {
						clearAssets();
					}}
					text="Clear assets"
				/>
			</div>

			{assets.map((asset, key) => (
				<p key={key}>
					{asset.name} #{asset.id}
					<Button
						action={() => {
							removeAsset(asset);
						}}
						text="Remove"
					/>
				</p>
			))}
		</div>
	);
}
