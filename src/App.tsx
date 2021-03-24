import { h, JSX } from "preact";
import { useState } from "preact/hooks";

import store from "./store";

import AssetCard from "./AssetCard";
import AssetCount from "./AssetCount";
import AtomicAssets from "./AtomicAssets";
import Button from "./Button";
import Scene from "./Scene";
import { getIpfsUrl } from "./IpfsImage";

export default function App(): JSX.Element {
	const [working, setWorking] = useState(false);
	const [assets, setAssets] = useState(store.getState().assets);

	store.subscribe(() => {
		const newAssets = store.getState().assets;
		setAssets([...newAssets]);
	});

	async function getAssets() {
		setWorking(true);

		const response = await AtomicAssets.assets();

		if (response.success) {
			for (const asset of response.data) {
				await fetch(getIpfsUrl(asset.data.img));
			}

			store.dispatch({
				type: "assets/add",
				assets: response.data,
			});
		} else {
			console.error("Unable to get assets", response);
		}

		setWorking(false);
	}

	return (
		<div>
			<h1 class="font-bold text-2xl">
				AtomicHeap <AssetCount />
			</h1>

			<div>
				<Button
					action={() => {
						store.dispatch({ type: "assets/clear" });
					}}
					text="Clear assets"
					disabled={working}
				/>
				<Button action={getAssets} text="Get assets" disabled={working} />
			</div>

			<div>
				<Scene />
			</div>

			<div class="grid grid-cols-6 gap-4">
				{assets.map((asset, key) => (
					<div key={key}>
						<AssetCard asset={asset} remove />
					</div>
				))}
			</div>
		</div>
	);
}
