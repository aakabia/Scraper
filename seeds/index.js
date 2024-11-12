const sequelize = require("../config/connection");
const { SeedPlayers } = require("./playerSeed");
const { SeedInjuredPlayers } = require("./injured");


const seedDatabase = async () => {
  try {
    // Above, we crate a async function that will seed our db
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");
   
    await SeedPlayers();
    console.log("\n----- PLAYERS SEEDED -----\n");

    await SeedInjuredPlayers();
    console.log("\n----- INJURED PLAYERS SEEDED -----\n");


  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  } finally {
    process.exit(0);
    // Above,  we exit and close our db.
  }
};

seedDatabase();
