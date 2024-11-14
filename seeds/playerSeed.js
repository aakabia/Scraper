const fs = require("fs");
const { Player } = require("../models");

async function SeedPlayers(filePath) {
  try {
    const rawData = fs.readFileSync(
      filePath,
      "utf-8"
    );
    const jsonData = JSON.parse(rawData);

    if (!jsonData) {
      console.log(
        `No Json data from: ${filePath}`
      );
      return;
    }

    // Above grabs our json data from our json file route.

    let cleanedData = jsonData.map((obj) => {
      const { id, full_name, ...newobj } = obj;
      newobj["player_id"] = id;
      newobj["full_name"] = full_name;
      newobj["full_name_cleaned"] = full_name
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return newobj;
    });

    // Above, we map over our jsonData and deconstruct each object
    // We do this to help clean up the name and add a player_id property

    await Player.bulkCreate(cleanedData);
    console.log("DATABASE Seeded With Players 🌱");

    // Above, we seed our Players table and log a response once it is complete.
  } catch (error) {
    console.error("Error Seeding Players to db:", error);
    throw error;
  }
}

module.exports = { SeedPlayers };
