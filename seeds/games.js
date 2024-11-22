const fs = require("fs/promises");
const {  Games } = require("../models");
const Papa = require("papaparse");

// Above, we import our model , fs, and papaparse to read our csv files 

async function SeedGameStats(filePath,bool,statYear) {
  try {
    
    console.log(`Reading file from: ${filePath}`);

    const data = await fs.readFile(filePath, "utf8");
    console.log("CSV data read successfully.");

    // Above, uses fs to read the file

    let results= [];
  
    Papa.parse(data, {
      header: true, 
      dynamicTyping: true, 
      skipEmptyLines: true,
      complete: (result) => {
        //console.log("Parsed CSV:", result.data); // Log parsed data

        // Process each row here
        result.data.forEach((row) => {
          
          
          let newRowObject ={
            player_id: row.Player_ID, 
            playoff_game: bool,
            stat_year: statYear,
            player_name: row.player_name,
            season_id: row.SEASON_ID,
            game_date: row.GAME_DATE,
            matchup: row.MATCHUP,
            home_away: row.MATCHUP.includes("@") ? 0 : 1,
            win_or_loss: row.WL,
            minutes_played: parseInt(row.MIN,10),
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
            plus_minus: parseInt(row.PLUS_MINUS, 10),
          }

          results.push(newRowObject)

          // Above uses papaparse and a for loop to a create a object for each key from our papaparse data.
        });
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });

    
    

    await Games.bulkCreate(results);
    console.log("DATABASE Seeded With Players Game Stats 🌱");
    // Bulk create our entries from results array 
   
  } catch (error) {
    console.error("Error Seeding Players Games to db:", error);
    throw error;
  }
}

module.exports = { SeedGameStats };