import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import store from "./store";
import AssetCount from "./AssetCount";
import Button from "./Button";
import IpfsImage from "./IpfsImage";
import AtomicAssets from "./AtomicAssets";

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
			alert("Error!");
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
						<div>{asset.data.name}</div>

						<div class="relative">
							<IpfsImage hash={asset.data.img} preview />

							<div class="absolute bottom-0 left-0">
								<Button
									action={() => {
										store.dispatch({
											type: "assets/remove",
											assets: [asset],
										});
									}}
									text="Remove"
								/>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
