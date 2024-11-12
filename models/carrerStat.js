const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");
// Above, imports our connection and our tools for using sequalize

class CurrentSeasonStats extends Model {}

CurrentSeasonStats.init(
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
        references: {
          model: "Player",
          key: "player_id",
        },
    },
    player_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },

    season: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    team_abbr:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    player_age:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    games_played:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    games_started:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    minutes_played:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    field_goals_made:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    field_goals_attempted:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    field_goals_percentage:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    field_goals_three_made:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    field_goals_three_attemp:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    field_goals_three_perc:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    free_throws_made:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    free_throws_attemp:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    free_throws_perc:{
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    offensive_reb:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    defensive_reb:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rebounds:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    assist:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    steals:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    blocks:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    turn_overs:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    personal_fouls:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    points:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },


  },

  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Current_Season", // We need to choose the model name
  }
);

//console.log(Exercise === sequelize.models.Exercise);
// Commented out above is to check if our model is created correctly.

module.exports = CurrentSeasonStats;