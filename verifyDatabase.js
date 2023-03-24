import sqlite3 from "sqlite3";
const db = new sqlite3.Database('./database/db.sqlite')
db.run('CREATE TABLE IF NOT EXISTS Blocks (ID integer primary_key not_null, nounce integer, timestamp datetime, data TEXT, previous_hash TEXT, hash TEXT)')
export default db