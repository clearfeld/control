import { type Client, type Store, Stronghold } from "@tauri-apps/plugin-stronghold";
// when using `"withGlobalTauri": true`, you may use
// const { Client, Stronghold } = window.__TAURI__.stronghold;
import { appDataDir } from "@tauri-apps/api/path";
// when using `"withGlobalTauri": true`, you may use
// const { appDataDir } = window.__TAURI__.path;

// const CLIENT_NAME = "Control";

type G_Stronghold = {
	stronghold: Stronghold | null;
	client: Client | null;
	store: Store | null;
};

export let g_stronghold: G_Stronghold = {
	stronghold: null,
	client: null,
	store: null,
};

export const initStronghold = async () => {
	const vaultPath = `${await appDataDir()}/vault.hold`;
	const vaultPassword = "vault password";
	const stronghold = await Stronghold.load(vaultPath, vaultPassword);

	let client: Client;
	const clientName = "name your client";
	try {
		client = await stronghold.loadClient(clientName);
	} catch {
		client = await stronghold.createClient(clientName);
	}

	return {
		stronghold,
		client,
	};
};

// export async function initStronghold() {
// 	const app_data_dir = await appDataDir();

// 	console.log(app_data_dir);

// 	const vaultPath = `${app_data_dir}/vault.hold`;
// 	const vaultPassword = import.meta.env.VITE_STRONGHOLD_VAULT_PASSWORD;
// 	try {
// 		const stronghold = await Stronghold.load(vaultPath, vaultPassword);

// 		console.log(stronghold);

// 		let client: Client;
// 		const clientName = CLIENT_NAME;

// 		console.log("start");

// 		try {
// 			console.log("here");
// 			client = await stronghold.loadClient(clientName);

// 			const store = client.getStore();
// 			console.log(store);

//             const v = await getRecord(store, "test");
// 			console.log(v);

// 			// await insertRecord(store, "test", "secret value");

// 			await stronghold.save();

// 			// gstronghold = stronghold;
// 			// gclient = client;
// 			g_stronghold = {
// 				stronghold: stronghold,
// 				client: client,
// 				store: store,
// 			};
// 		} catch {
// 			console.log("here create");
// 			try {
// 				client = await stronghold.createClient(clientName);

// 				const store = client.getStore();
// 				console.log(store);

// 				// insertRecord(store, "test", "secret value");
// 				const v = await getRecord(store, "test");
// 				console.log(v);

//                 // await insertRecord(store, "test", "secret value");

// 				await stronghold.save();
// 				// gstronghold = stronghold;
// 				// gclient = client;
// 				g_stronghold = {
// 					stronghold: stronghold,
// 					client: client,
// 					store: store,
// 				};
// 			} catch (e) {
// 				console.log("error");
// 				console.log(e);
// 			}
// 		}

// 		console.log("end");
// 		// return {
// 		// 	stronghold,
// 		// 	client,
// 		// };
// 	} catch {
// 		console.log("wtf");
// 	}
// }

// Insert a record to the store
export async function insertRecord(store: any, key: string, value: string) {
	const data = Array.from(new TextEncoder().encode(value));
	await store.insert(key, data);
}

// Read a record from store
export async function getRecord(store: any, key: string): Promise<string> {
	const data = await store.get(key);
	return new TextDecoder().decode(new Uint8Array(data));
}

// const { stronghold, client } = await initStronghold();
// const store = client.getStore();

// const key = 'my_key';

// Insert a record to the store
// insertRecord(store, key, 'secret value');

// Read a record from store
// const value = await getRecord(store, key);
// console.log(value); // 'secret value'

// Save your updates
// await stronghold.save();

// Remove a record from store
// await store.remove(key);



export async function Test() {
    console.log("here");

    const { stronghold, client } = await initStronghold();

    const store = client.getStore();
    const key = 'my_key';

    // Insert a record to the store
    insertRecord(store, key, 'secret value');

    // Read a record from store
    const value = await getRecord(store, key);
    console.log(value); // 'secret value'

    // Save your updates
    await stronghold.save();

    console.log("endddd");

}