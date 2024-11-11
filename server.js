require("dotenv").config();
const sequelize = require("./config/connection");



sequelize.sync({ force: false }).then(() => {
   console.log("connected to sports_db")
});






// Above imports our fucntion to create our json file with data in it
