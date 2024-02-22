const sql = require("mysql2");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function connectDatabase() {
  try {
    const connection = await sql.createConnection(dbConfig);
    console.log("Database connected!");
    connection.on("error", (error) => {
      console.error("Database error: ", error);
    });
    return connection;
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
}

module.exports = connectDatabase;
