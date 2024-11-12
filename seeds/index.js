const sequelize = require("../config/connection");
const { SeedPlayers } = require("./playerSeed");
const { SeedInjuredPlayers } = require("./injured");
const { SeedCurrentStats } = require("./currentSeason");
const currentSeason = "/Users/akabia/projects/Scraper/csv/players/active_players_carrer_stats_2024.csv"
const pastSeasons = "/Users/akabia/projects/Scraper/csv/players/active_players_carrer_stats.csv"



const seedDatabase = async () => {
  try {
    // Above, we crate a async function that will seed our db
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");
   
    await SeedPlayers();
    console.log("\n----- PLAYERS SEEDED -----\n");

    await SeedInjuredPlayers();
    console.log("\n----- INJURED PLAYERS SEEDED -----\n");

    await SeedCurrentStats(currentSeason);
    console.log("\n----- Player Season Stats For 2024 Season Seeded -----\n");

    await SeedCurrentStats(pastSeasons);
    console.log("\n----- Player Season Stats For Past Seasons Seeded -----\n");


  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  } finally {
    process.exit(0);
    // Above,  we exit and close our db.
  }
};

seedDatabase();
