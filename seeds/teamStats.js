const fs = require("fs/promises");
const { TeamStats, AdvanceTeamStats  } = require("../models");
const Papa = require("papaparse");



async function SeedTeamSeasonStats(filePath,year,statType) {
  try {
    
    console.log(`Reading file from: ${filePath}`);

    const data = await fs.readFile(filePath, "utf8");


    if(!data){
        console.log("No data returned from csv file!");
        return;
    };




    console.log("CSV data read successfully.");

    

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
            team_name: row.Team.replace(/\*$/, ""), 
            stat_type: statType,
            stat_year: year,
            ranking:row.Rk,
            games:row.G,
            minutes_played:row.MP,
            field_goals: row.FG,
            field_goal_att: row.FGA,
            field_goal_perc: row["FG%"],
            three_point_field_goals: row["3P"],
            three_point_field_goal_att:row["3PA"],
            three_point_field_goal_perc:row["3P%"],
            two_point_field_goals:row["2P"],
            two_point_field_goal_att:row["2PA"],
            two_point_field_goal_perc:row["2P%"],
            free_throws:row.FT,
            free_throw_att: row.FTA,
            free_throw_perc:row["FT%"],
            offense_reb:row.ORB,
            defense_reb:row.DRB,
            total_reb:row.TRB ,
            assist:row.AST,
            steals: row.STL,
            blocks:row.BLK,
            turnovers:row.TOV,
            personal_fouls: row.PF,
            points:row.PTS,


            
          }

          results.push(newRowObject)

          
        });
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });

    
    

    await TeamStats.bulkCreate(results);
    console.log(`DATABASE Seeded With ${statType} Team Stats for year ${year} 🌱`);
    // Bulk create our entries from results array 
   
  } catch (error) {
    console.error("Error Seeding Players Games to db:", error);
    throw error;
  }
}



async function SeedTeamAdvanceStats(filePath,year,statType) {
    try {
      
      console.log(`Reading file from: ${filePath}`);
  
      const data = await fs.readFile(filePath, "utf8");

      if(!data){
        console.log("No data returned from csv file!");
        return;
      };


      console.log("CSV data read successfully.");
  
      
  
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
              team_name: row.Team.replace(/\*$/, ""), 
              stat_type: statType,
              stat_year: year,
              ranking:row.Rk,
              average_player_age: row.Age,
              wins: row.W,
              losses:row.L ,
              pythagorean_wins:row.PW ,
              pythagorean_losses:row.PL,
              margin_of_victory:row.MOV,
              strength_of_schedule:row.SOS,
              simply_rating_system:row.SRS,
              offensive_rating:row.ORtg,
              defensive_rating:row.DRtg,
              net_rating:row.NRtg ,
              pace_factor:row.Pace ,
              free_throw_att_rating:row.FTr,
              three_point_att_rate:row["3PAr"] ,
              true_shooting_perc:row["TS%"] ,
              offensive_reb_perc:row["ORB%"],
              defensive_reb_perc:row["DRB%"],
  
            }
  
            results.push(newRowObject)
  
            
          });
        },
        error: (err) => {
          console.error("Error parsing CSV:", err);
        },
      });
  
      
      
  
      await AdvanceTeamStats.bulkCreate(results);
      console.log(`DATABASE Seeded With ${statType} Team Stats for year ${year} 🌱`);
      // Bulk create our entries from results array 
     
    } catch (error) {
      console.error("Error Seeding Players Games to db:", error);
      throw error;
    }
}
  














module.exports = {SeedTeamSeasonStats, SeedTeamAdvanceStats};