const sequelize = require("../config/connection");
const { SeedPlayers } = require("./playerSeed");

const seedDatabase = async () => {
  try {
    // Above, we crate a async function that will seed our db
    await sequelize.sync({ force: true });
    console.log("\n----- DATABASE SYNCED -----\n");
    // Above , we first call sequlize.sync to establish connecting to our db.
    // Force is equal to true here so we start with a new seeded db everytime we call this during development.

    await SeedPlayers();
    console.log("\n----- PLAYERS SEEDED -----\n");
    // Above, we call seedDbWithExercise with apicall as a argument.
  } catch (error) {
    console.error("An error occurred while seeding the database:", error);
  } finally {
    process.exit(0);
    // Above,  we exit and close our db.
  }
};

seedDatabase();
