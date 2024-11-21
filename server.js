require("dotenv").config();
const sequelize = require("./config/connection");
const {createCsvForYear, createInjuryJson} = require("./helpers/data")



/*sequelize.sync({ force: false }).then(() => {
   console.log("connected to sports_db")
});*/

createCsvForYear("2025");
//createInjuryJson()



// Above imports our fucntion to create our json file with data in it
