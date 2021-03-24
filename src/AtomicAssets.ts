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

export default class AtomicAssets {
	public static async assets(): Promise<Response<Asset>> {
		const response = await fetch(`${API_ROOT}/v1/assets?limit=10`);
		return await response.json();
	}
}
