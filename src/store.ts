import { Action, createStore, Reducer } from "redux";
import { Asset } from "./AtomicAssets";

interface AssetAction extends Action<string> {
	type: "assets/add" | "assets/clear" | "assets/remove";
	assets?: Asset[];
}

interface Store {
	assets: Asset[];
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
			newState.assets = [...action.assets, ...newState.assets];
			break;

		case "assets/clear":
			newState.assets.length = 0;
			break;

		case "assets/remove":
			newState.assets = newState.assets.filter(
				(asset) => action.assets.indexOf(asset) === -1
			);
			break;
	}

	return newState;
};

const store = createStore(reducer);

export default store;
