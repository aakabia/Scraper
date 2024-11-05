const scrapper = require("../scrapper/scrape");
const injuryScrapper = require("../scrapper/nbaInjuries");
const fs = require("fs");
const path = require('path');

// ABove imports our scrape functions 
// Also, import fs and path to write our json file


async function createInjuryJson() {

    const directoryPath = path.join(__dirname, '..', 'json');
    const filePath = path.join(directoryPath, 'injured_players.json');

    // Above, joins the dir and creates a file path to write to.

  const injuryData = await injuryScrapper();

  if (!injuryData) {
    throw new Error("Injury data is undefined");
  }

  // Above, checks of the data exists 

  const jsonData = JSON.stringify(injuryData, null, 4);

  // Have to turn the data to a string before writing it. 


  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log("JSON file has been written successfully");
    }
  });

  // Above writes a json file with the data in it. 
}

module.exports = {createInjuryJson};
