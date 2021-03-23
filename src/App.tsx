import { h, JSX } from "preact";
import { useState } from "preact/hooks";
import store, { AtomicAsset } from "./store";
import { addAsset, addAssets, clearAssets, removeAsset } from "./AssetManager";
import AssetCount from "./AssetCount";
import Button from "./Button";

interface ResponseJson {
	data: [
		{
			data: {
				back_img: string;
				img: string;
				name: string;
			};
		}
	];
}

export default function App(): JSX.Element {
	const [assets, setAssets] = useState(store.getState().assets);

	store.subscribe(() => {
		const newAssets = store.getState().assets;
		setAssets([...newAssets]);
	});

	function getAssets() {
		fetch(
			"https://us1.wax.api.atomicassets.io/atomicmarket/v1/assets?owner=pwlb2.wam&collection_name=kogsofficial"
		)
			.then((response) => {
				return response.json();
			})
			.then((json: ResponseJson) => {
				const assets: AtomicAsset[] = json.data.map((datum) => {
					return {
						img: `https://wax.atomichub.io/ipfs/${datum.data.img}`,
						backimg: `https://wax.atomichub.io/preview?ipfs=${datum.data.img}`,
						name: datum.data.name,
					};
				});

				console.log(assets);

				addAssets(...assets);
			});
	}

	return (
		<div>
			<h1>AtomicHeap</h1>
			<AssetCount />
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
				<Button action={getAssets} text="Get assets" />
			</div>

			<div class="grid grid-cols-6 gap-4">
				{assets.map((asset, key) => (
					<div key={key}>
						<div>{asset.name}</div>

						<img src={asset.backimg} alt="" />

						<Button
							action={() => {
								removeAsset(asset);
							}}
							text="Remove"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
