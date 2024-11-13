const scrapper = require("../scrapper/scrape");
const injuryScrapper = require("../scrapper/nbaInjuries");
const getTeamsDataByYear = require("../scrapper/nbaTeams");
const fs = require("fs");
const path = require("path");

// ABove imports our scrape functions
// Also, import fs and path to write our json file

async function createInjuryJson() {
  const directoryPath = path.join(__dirname, "..", "json");
  const filePath = path.join(directoryPath, "injured_players.json");

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

async function createCsvForYear(year) {
  const teamsData = await getTeamsDataByYear(year);

  if (!teamsData) {
    throw new Error("teams data is undefined");
  }


  const directoryPath = path.join(__dirname, "..", "csv", "teams", "nba",`stats${year}`);

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  const writePromises = Object.keys(teamsData).map(async (key) => {
    const filePath = path.join(directoryPath, `${key}_${year}.csv`);
    try {
      await fs.promises.writeFile(filePath, teamsData[key]);
      console.log(`CSV file for ${key} has been written successfully`);
    } catch (err) {
      console.error(`Error writing CSV file for ${key}:`, err);
    }
  });

  await Promise.all(writePromises);
  console.log("All CSV files have been written successfully");
}

module.exports = { createInjuryJson, createCsvForYear };
