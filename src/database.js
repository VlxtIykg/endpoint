const cwd = "/home/kami/sb_scripts/fundamentalis/endpoint"
const Database = require("better-sqlite3")(
  cwd + "/data/minions.db",
  {
    verbose: console.log,
  }
);
module.exports.createTable = async () => {
  Database.pragma("journal_mode = WAL");
  Database.prepare(
    `CREATE TABLE IF NOT EXISTS bot ( 
		id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
		status INTEGER NOT NULL,
		capacity TEXT NOT NULL,
		coins_per_hour TEXT NOT NULL,
		total_made TEXT NOT NULL
		)`
  ).run();
  Database.prepare(
    `CREATE TABLE IF NOT EXISTS fuel ( 
			id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
			amount INTEGER NOT NULL
			)`
  ).run();
  Database.prepare(
  `CREATE TABLE IF NOT EXISTS posturefit ( 
    highscore INTEGER NOT NULL
    )`
  ).run();
};

module.exports.emergencyButton = dbNAME => {
  try {
    Database.exec(`DROP TABLE ${dbNAME}`);
    this.createTable();
  } catch (error) {
    console.log("Already deleted");
  }
};

this.createTable();

module.exports.getAllTables = () => {
  return Database.prepare(
    `SELECT *
FROM bot
JOIN fuel ON bot.id = fuel.id
WHERE bot.id = ?`
  ).all(1);
};

module.exports.getFuelStatistics = () => {
  return Database.prepare(
    `SELECT *
		FROM fuel`
  ).all();
};

module.exports.getBotStatistics = () => {
  return Database.prepare(
    `SELECT *
		FROM bot`
  ).all();
};

module.exports.getPfHsStatistics = () => {
  return Database.prepare(
    `SELECT highscore
		FROM posturefit`
  ).all();
};

module.exports.postFuelStatistics = (amount, id) => {
  if (amount === null) return "Amount is required.";
  try {
    getCurrent = this.getFuelStatistics()[0].amount;
    setCurrent = "UPDATE fuel SET amount = ? WHERE id = ?";
    Database.prepare(setCurrent).run(amount, id);
    newCurrent = this.getFuelStatistics()[0].amount;
    return `Succesful post. Changed from ${getCurrent} to ${newCurrent}`;
  } catch (error) {
    console.log(error);
    return "Unsuccesful post.";
  }
};

module.exports.postBotStatistics = (id, data) => {
  try {
    getCurrent = this.getBotStatistics()[0];
    setCurrent =
      "UPDATE bot SET status = ?, capacity = ?, coins_per_hour = ?, total_made = ? WHERE id = ?";
    Database.prepare(setCurrent).run(
      data.status,
      data.capacity,
      data.cph,
      data.tm,
      id
    );
    newCurrent = this.getBotStatistics()[0];
    return `Succesful post. Changed from ${JSON.stringify(
      getCurrent
    )} to ${JSON.stringify(newCurrent)}`;
  } catch (error) {
    console.log(error);
    return "Unsuccesful post.";
  }
};

module.exports.postStatusStatistics = (id, status) => {
  try {
    getCurrent = this.getBotStatistics()[0].status;
    setCurrent = "UPDATE bot SET status = ? WHERE id = ?";
    Database.prepare(setCurrent).run(status, id);
    newCurrent = this.getBotStatistics()[0].status;
    return `Succesful post. Changed from ${getCurrent} to ${newCurrent}`;
  } catch (error) {
    console.log(error);
    return "Unsuccesful post.";
  }
}

module.exports.postPfHsStatistics = (highscore) => {
  try {
    getCurrent = this.getBotStatistics()[0].status;
    setCurrent = "UPDATE posturefit SET highscore = ?";
    Database.prepare(setCurrent).run(highscore);
    newCurrent = this.getBotStatistics()[0].status;
    return `Succesful post. Changed highscore from ${getCurrent} to ${newCurrent}!`;
  } catch (error) {
    console.log(error);
    return "Unsuccesful post.";
  }
}


// console.log(this.getAllTables());
// console.log(this.getAll());

module.exports.createNewRow = async () => {
  const stmt = Database.prepare(`INSERT INTO fuel(amount) VALUES(?)`).run(10);
  const stmt2 = Database.prepare(
    `INSERT INTO bot(status, capacity, coins_per_hour, total_made) VALUES(?, ?, ?, ?)`
  ).run(1, "263k", "5m", "1.5m");
};
