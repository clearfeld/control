import Database from '@tauri-apps/plugin-sql';
// when using `"withGlobalTauri": true`, you may use
// const V = window.__TAURI__.sql;

export const sqlite_db = await Database.load('sqlite:control.db');