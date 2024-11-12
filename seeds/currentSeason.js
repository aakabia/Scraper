const fs = require("fs/promises");
const {  CurrentSeasonStats } = require("../models");
const Papa = require("papaparse");

async function SeedCurrentStats(filePath) {
  try {
    
    console.log(`Reading file from: ${filePath}`);

    const data = await fs.readFile(filePath, "utf8");
    console.log("CSV data read successfully.");

    let results= [];
  
    Papa.parse(data, {
      header: true, // Treat first row as header
      dynamicTyping: true, // Automatically convert values to appropriate types
      skipEmptyLines: true,
      complete: (result) => {
        //console.log("Parsed CSV:", result.data); // Log parsed data

        // Process each row here
        result.data.forEach((row) => {
          
          // Insert into database or any other processing
          let newRowObject ={
            player_id: row.PLAYER_ID, // Replace with the correct column mappings
            player_name: row.player_name,
            season: row.SEASON_ID,
            team_abbr: row.TEAM_ABBREVIATION,
            player_age: parseInt(row.PLAYER_AGE, 10),
            games_played: parseInt(row.GP, 10),
            games_started: parseInt(row.GS, 10),
            minutes_played: parseFloat(row.MIN),
            field_goals_made: parseInt(row.FGM, 10),
            field_goals_attempted: parseInt(row.FGA, 10),
            field_goals_percentage: parseFloat(row.FG_PCT),
            field_goals_three_made: parseInt(row.FG3M, 10),
            field_goals_three_attemp: parseInt(row.FG3A, 10),
            field_goals_three_perc: parseFloat(row.FG3_PCT),
            free_throws_made: parseInt(row.FTM, 10),
            free_throws_attemp: parseInt(row.FTA, 10),
            free_throws_perc: parseFloat(row.FT_PCT),
            offensive_reb: parseInt(row.OREB, 10),
            defensive_reb: parseInt(row.DREB, 10),
            rebounds: parseInt(row.REB, 10),
            assist: parseInt(row.AST, 10),
            steals: parseInt(row.STL, 10),
            blocks: parseInt(row.BLK, 10),
            turn_overs: parseInt(row.TOV, 10),
            personal_fouls: parseInt(row.PF, 10),
            points: parseInt(row.PTS, 10),
          }

          results.push(newRowObject)
        });
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });

    

    await CurrentSeasonStats.bulkCreate(results);
    console.log("DATABASE Seeded With Players Season Stats 🌱");
   
  } catch (error) {
    console.error("Error Seeding Players Current Season to db:", error);
    throw error;
  }
}

module.exports = { SeedCurrentStats };
