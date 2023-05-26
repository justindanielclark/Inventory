import database from "../database/database";
async function main() {
  const a = await database.createConnection();
}

main();
