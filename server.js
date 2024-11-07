require("dotenv").config();
const {createInjuryJson} = require("./helpers/data");
const getTeamsDataByYear = require("./scrapper/nbaTeams")


//createInjuryJson();

async function test(){
    console.log(await getTeamsDataByYear("2024"))
}

test();

// fix dadiet player name in json data 
// Also Moussa Diabat
// Above imports our fucntion to create our json file with data in it
