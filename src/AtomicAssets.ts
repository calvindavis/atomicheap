const API_ROOT = "https://wax.api.atomicassets.io/atomicassets";

export interface Asset {
	contract: string;
	asset_id: string;
	owner: string;
	is_transferable: boolean;
	is_burnable: boolean;
	collection: {
		collection_name: string;
		name: string;
		img: string;
		author: string;
		allow_notify: boolean;
		authorized_accounts: string[];
		notify_accounts: string[];
		market_fee: number;
		created_at_block: string;
		created_at_time: string;
	};
	// TODO schema through minted_at_time
	data: {
		img: string;
		name: string;
	};
}

export interface Response<TData> {
	success: boolean;
	data: TData[];
}

interface AssetOptions {
	owner?: string;
	burned?: boolean;
	collection_name?: string;
	schema_name?: string;
	limit?: number;
}

export default class AtomicAssets {
	public static async assets(
		options: AssetOptions = {
			collection_name: "kogsofficial",
			schema_name: "2ndedition",
		}
	): Promise<Response<Asset>> {
		const url = new URL(`${API_ROOT}/v1/assets`);

		_appendSearchParam(url, "owner", options.owner);
		_appendSearchParam(url, "collection_name", options.collection_name);
		_appendSearchParam(url, "schema_name", options.schema_name);
		_appendSearchParam(url, "limit", options.limit);

		const response = await fetch(url.toString());

		return await response.json();
	}
}

function _appendSearchParam(url: URL, name: string, value: any) {
	if (value) {
		url.searchParams.append(name, `${value}`);
	}
}
