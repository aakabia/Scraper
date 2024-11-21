const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class AdvanceTeamStats extends Model {}

AdvanceTeamStats.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    team_name: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Teams",
        key: "team_name",
      },
    },

    stat_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    stat_year: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    ranking: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    average_player_age: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    pythagorean_wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pythagorean_losses: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    margin_of_victory: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    strength_of_schedule: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    simply_rating_system: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    offensive_rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    defensive_rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    net_rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    pace_factor: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    free_throw_att_rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    three_point_att_rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    true_shooting_perc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    offensive_reb_perc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    defensive_reb_perc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "AdvanceTeamStats",
  }
);

module.exports = AdvanceTeamStats;
