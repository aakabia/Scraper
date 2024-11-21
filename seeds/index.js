const sequelize = require("../config/connection");
const { SeedPlayers } = require("./playerSeed");
const { SeedInjuredPlayers } = require("./injured");
const { SeedCurrentStats } = require("./currentSeason");
const { SeedGameStats } = require("./games");
const { SeedTeamStats } = require("./teams");
const {SeedTeamSeasonStats,SeedTeamAdvanceStats}=require("./teamStats")

// Above, imports our functions 

const currentSeason =`/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/players/active_players_carrer_stats_2024.csv`;
const pastSeasons =`/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/players/active_players_carrer_stats.csv`;
// career stats 
const currentYearGames =`/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/performance/players_2024_stats.csv`;
const year2023Games =`/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/gamelogs/active_players_logs_2023.csv`;
const year2022Games =`/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/gamelogs/active_players_logs_2022.csv`;
// game logs 
const playOff2023 =`/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/playofflogs/players_playoffs_logs_2023.csv`;
const playOff2022 =`/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/playofflogs/players_playoffs_logs_2022.csv`;
// playoffs last two years 
const injuredPlayers =`/Users/${process.env.DEVICE_USER}/projects/Scraper/json/injured_players.json`;
const activePlayers = `/Users/${process.env.DEVICE_USER}/projects/Scraper/json/active_players.json`;
// injured and active players 

// Above are player csv data files corresponding to year or season.



const totalTeamSeasonStats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2025/totalStatsCSV_2025.csv`;
const perGameSeasonStats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2025/perGameCSV_2025.csv`;
const per100PossSeasonStats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2025/per100PosCSV_2025.csv`;
const advanceSeasonStats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2025/advancedStatsCSV_2025.csv`;
//current Season 
const totalTeam2024Stats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2024/totalStatsCSV_2024.csv`;
const perGame2024Stats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2024/perGameCSV_2024.csv`;
const per100Poss2024Stats= `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2024/per100PosCSV_2024.csv`;
const advance2024Stats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2024/advancedStatsCSV_2024.csv`;
// 2024 Season
const totalTeam2023Stats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2023/totalStatsCSV_2023.csv`;
const perGame2023Stats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2023/perGameCSV_2023.csv`;
const per100Poss2023Stats= `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2023/per100PosCSV_2023.csv`;
const advance2023Stats = `/Users/${process.env.DEVICE_USER}/projects/Scraper/csv/teams/nba/stats2023/advancedStatsCSV_2023.csv`;
// 2023 season 
// Above are csv data files for teams corresponding to year or season.




// Above creates pathes to different csv files

const seedDatabase = async () => {
  try {
    // Above, we crate a async function that will seed our db
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");

    await SeedPlayers(activePlayers);
    console.log("\n----- PLAYERS SEEDED -----\n");

    await SeedInjuredPlayers(injuredPlayers);
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

    // player seed ends 

    await SeedTeamStats(totalTeamSeasonStats);
    console.log("\n----- Teams Names Seeded -----\n");

    await SeedTeamSeasonStats(totalTeamSeasonStats,"24-2025","Team Total Stats");
    console.log("\n----- Teams Total Stats for 24-2025 Season Seeded -----\n");

    await SeedTeamSeasonStats(perGameSeasonStats,"24-2025","Per Game Stats");
    console.log("\n----- Teams Per Game Stats for 24-2025 Season Seeded -----\n");

    await SeedTeamSeasonStats(per100PossSeasonStats,"24-2025","Per 100 Poss Stats");
    console.log("\n----- Teams Per 100 Poss Stats for 24-2025 Season Seeded -----\n");

    await SeedTeamSeasonStats(totalTeam2024Stats,"23-2024","Team Total Stats");
    console.log("\n----- Teams Total Stats for 23-2024 Season Seeded -----\n");

    await SeedTeamSeasonStats(perGame2024Stats,"23-2024","Per Game Stats");
    console.log("\n----- Teams Per Game Stats for 23-2024 Season Seeded -----\n");

    await SeedTeamSeasonStats(per100Poss2024Stats,"23-2024","Per 100 Poss Stats");
    console.log("\n----- Teams Per 100 Poss Stats for 23-2024 Season Seeded -----\n");

    await SeedTeamSeasonStats(totalTeam2023Stats,"22-2023","Team Total Stats");
    console.log("\n----- Teams Total Stats for 22-2023 Season Seeded -----\n");

    await SeedTeamSeasonStats(perGame2023Stats,"22-2023","Per Game Stats");
    console.log("\n----- Teams Per Game Stats for 22-2023 Season Seeded -----\n");

    await SeedTeamSeasonStats(per100Poss2023Stats,"22-2023","Per 100 Poss Stats");
    console.log("\n----- Teams Per 100 Poss Stats for 22-2023 Season Seeded -----\n");

    // Team season stats seed ends 


    await SeedTeamAdvanceStats(advanceSeasonStats,"24-2025","Advance Stats");
    console.log("\n----- Teams Advance Stats for 24-2025 Season Seeded -----\n");

    await SeedTeamAdvanceStats(advance2024Stats,"23-2024","Advance Stats");
    console.log("\n----- Teams Advance Stats for 23-2024 Season Seeded -----\n");


    await SeedTeamAdvanceStats(advance2023Stats,"22-2023","Advance Stats");
    console.log("\n----- Teams Advance Stats for 22-2023 Season Seeded -----\n");

    // Teams Advance stats seed ends 




  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  } finally {
    process.exit(0);
    // Above,  we exit and close our db.
  }
};

seedDatabase();
