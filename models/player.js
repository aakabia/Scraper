const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Player extends Model {}

Player.init(
  {
    // Model attributes are defined here

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    player_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    player_height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_team_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    player_team_abr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Player", // We need to choose the model name
  }
);

//console.log(Exercise === sequelize.models.Exercise);
// Commented out above is to check if our model is created correctly.

module.exports = Player;
