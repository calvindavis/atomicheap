import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import store from "./store";
import AssetCount from "./AssetCount";
import Button from "./Button";
import IpfsImage from "./IpfsImage";
import AtomicAssets from "./AtomicAssets";
import AssetCard from "./AssetCard";

export default function App(): JSX.Element {
	const [assets, setAssets] = useState(store.getState().assets);

	store.subscribe(() => {
		const newAssets = store.getState().assets;
		setAssets([...newAssets]);
	});

	async function getAssets() {
		const response = await AtomicAssets.assets();

		if (response.success) {
			store.dispatch({
				type: "assets/add",
				assets: response.data,
			});
		} else {
			console.error("Unable to get assets", response);
		}
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
				/>
				<Button action={getAssets} text="Get assets" />
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
