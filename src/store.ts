import { Action, createStore, Reducer } from "redux";

export interface AtomicAsset {
	backimg?: string;
	collection: string;
	id: number;
	img: string;
	name: string;
}

interface AssetAction extends Action<string> {
	type: "assets/add" | "assets/clear" | "assets/remove";
	asset?: AtomicAsset;
}

interface Store {
	assets: AtomicAsset[];
}

const reducer: Reducer<Store, AssetAction> = (
	state = {
		assets: [],
	},
	action
) => {
	const newState = { ...state };

	switch (action.type) {
		case "assets/add":
			newState.assets.push(action.asset);
			break;

		case "assets/clear":
			newState.assets.length = 0;
			break;

		case "assets/remove":
			newState.assets = newState.assets.filter(
				(asset) => asset !== action.asset
			);
			break;
	}

	return newState;
};

const store = createStore(reducer);

export default store;
