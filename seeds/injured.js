const fs = require("fs");
const { Player, Injured } = require("../models");

async function SeedInjuredPlayers() {
  try {
    const players = await Player.findAll(); // This will fetch all rows from the Player table

    if (!players) {
      console.log("No Players found in db!");
      return;
    }

    // Above, checks if player data exists

    const playersCLeaned = players.map((player) => player.get({ plain: true }));

    const rawData = fs.readFileSync(
      "/Users/akabia/projects/Scraper/json/injured_players.json",
      "utf-8"
    );
    const jsonData = JSON.parse(rawData);

    if (!jsonData) {
      console.log(
        "No Json data from: /Users/akabia/projects/Scraper/json/injured_players.json "
      );
      return;
    }

    // Above grabs our json data from our json file route.

    const injuredPlayers = [];

    // Above initalizes our injuredPlayers array.

    for (let i = 0; i < jsonData.length; i++) {
      for (let j = 0; j < players.length; j++) {
        if (
          players[j].full_name_cleaned === jsonData[i].teamInjuredPlayer.Name
        ) {
          let newInjuredPlayerObj = {
            injured: true,
            player_id: players[j].player_id,
            ...jsonData[i],
          };

          injuredPlayers.push(newInjuredPlayerObj);
        }
      }
    }

    // Above, we loop over our json data and our players to match injured players based on their name.
    // If a name match is found, we create a new injured player object and push it to our injuredPlayers array.

    await Injured.bulkCreate(injuredPlayers);
    console.log("DATABASE Seeded With  Injured Players 🌱");

    // Above, we seed our Injured table and log a response once it is complete.
  } catch (error) {
    console.error("Error Seeding Injured Players to db:", error);
    throw error;
  }
}

module.exports = { SeedInjuredPlayers };
