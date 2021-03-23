import store, { AtomicAsset } from "./store";

export function addAsset(name: string): void {
	store.dispatch({
		type: "assets/add",
		assets: [
			{
				collection: "calvindavis1",
				id: Math.round(Math.random() * 1e10),
				img: "",
				name,
			},
		],
	});
}

export function addAssets(...assets: AtomicAsset[]) {
	store.dispatch({
		type: "assets/add",
		assets,
	});
}

export function clearAssets(): void {
	store.dispatch({
		type: "assets/clear",
	});
}

export function removeAsset(asset: AtomicAsset) {
	store.dispatch({
		type: "assets/remove",
		assets: [asset],
	});
}
