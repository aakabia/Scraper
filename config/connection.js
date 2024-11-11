
const { Sequelize } = require('sequelize');



let sequelize;
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL);
  // Above, is for if we use a url for our connection.
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "postgres",
    }
  );
  // Above, we create a new instance of the sequalize object. 
  // Also, we establish the connection from our enviornment variables 
  // Note, due to using postgres we need to have the pg module installed as well.
}
module.exports = sequelize;