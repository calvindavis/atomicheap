import { h, JSX } from "preact";
import { Asset } from "./AtomicAssets";
import Button from "./Button";
import IpfsImage from "./IpfsImage";
import store from "./store";

export interface AssetCardProps {
	asset: Asset;
	remove?: boolean;
}

export default function AssetCard({
	asset,
	remove,
}: AssetCardProps): JSX.Element {
	return (
		<details>
			<summary>
				<div>{asset.data.name}</div>

				<div class="relative">
					<IpfsImage hash={asset.data.img} />

					{remove && (
						<div class="absolute bottom-0 right-0">
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
					)}
				</div>
			</summary>

			<pre class="text-xs whitespace-pre-wrap">{JSON.stringify(asset)}</pre>
		</details>
	);
}
