const fs = require("fs/promises");
const {  Teams } = require("../models");
const Papa = require("papaparse");
const {getTeamAbr} = require("../helpers/teamAbr")



async function SeedTeamStats(filePath) {
  try {
    
    console.log(`Reading file from: ${filePath}`);

    const data = await fs.readFile(filePath, "utf8");
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
            team_name: row.Team,
            team_abr: getTeamAbr(row.Team)

            
          }

          results.push(newRowObject)

          
        });
      },
      error: (err) => {
        console.error("Error parsing CSV:", err);
      },
    });

    
    

    await Teams.bulkCreate(results);
    console.log("DATABASE Seeded With Team Names 🌱");
    // Bulk create our entries from results array 
   
  } catch (error) {
    console.error("Error Seeding Players Games to db:", error);
    throw error;
  }
}







module.exports = {SeedTeamStats};