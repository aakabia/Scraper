const sequelize = require("../config/connection");
const { SeedPlayers } = require("./playerSeed");
const { SeedInjuredPlayers } = require("./injured");
const { SeedCurrentStats } = require("./currentSeason");
const { SeedGameStats } = require("./games");

// Above, imports our functions 

const currentSeason =
  `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/players/active_players_carrer_stats_2024.csv`;
const pastSeasons =
  `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/players/active_players_carrer_stats.csv`;
const currentYearGames =
  `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/performance/players_2024_stats.csv`;
const year2023Games =
  `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/gamelogs/active_players_logs_2023.csv`;
const year2022Games =
  `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/gamelogs/active_players_logs_2022.csv`;
const playOff2023 =
  `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/playofflogs/players_playoffs_logs_2023.csv`;
const playOff2022 =
  `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/playofflogs/players_playoffs_logs_2022.csv`;

// Above creates pathes to different csv files

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

    // Pass in our path to use function 

    await SeedCurrentStats(pastSeasons);
    console.log("\n----- Player Season Stats For Past Seasons Seeded -----\n");

    await SeedGameStats(currentYearGames, false);
    console.log("\n----- Player Current Year Game Stats Seeded -----\n");

    // Pass in path and boolean to use function 

    await SeedGameStats(year2023Games, false);
    console.log("\n----- Player 2023 Year Game Stats Seeded -----\n");

    await SeedGameStats(year2022Games, false);
    console.log("\n----- Player 2024 Year Game Stats Seeded -----\n");

    await SeedGameStats(playOff2023, true);
    console.log("\n----- Player Playoff 2023 Year Game Stats Seeded -----\n");

    await SeedGameStats(playOff2022, true);
    console.log("\n----- Player Playoff 2022 Year Game Stats Seeded -----\n");
  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  } finally {
    process.exit(0);
    // Above,  we exit and close our db.
  }
};

seedDatabase();
