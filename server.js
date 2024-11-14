require("dotenv").config();
const sequelize = require("./config/connection");
const {createCsvForYear} = require("./helpers/data")



/*sequelize.sync({ force: false }).then(() => {
   console.log("connected to sports_db")
});*/

//createCsvForYear("2023");




// Above imports our fucntion to create our json file with data in it
