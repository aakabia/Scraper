const fs = require("fs");
const { Player } = require("../models");

async function SeedPlayers() {
  try {
    const rawData = fs.readFileSync(
      "/Users/akabia/projects/Scraper/json/active_players.json",
      "utf-8"
    );
    const jsonData = JSON.parse(rawData);

    let cleanedData = jsonData.map((obj) => {
      const { id, ...newobj } = obj;
      newobj["player_id"] = id;

      return newobj;
    });

    await Player.bulkCreate(cleanedData);
    console.log("DATABASE Seeded With Players 🌱");
  } catch (error) {
    console.error("Error Seeding Players to db:", error);
    throw error;
  }
}

module.exports = { SeedPlayers };
