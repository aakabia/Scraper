const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class TeamStats extends Model {}

TeamStats.init(
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

    games: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    minutes_played: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    field_goals: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    field_goal_att: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    field_goal_perc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    three_point_field_goals: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    three_point_field_goal_att: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    three_point_field_goal_perc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    two_point_field_goals: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    two_point_field_goal_att: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    two_point_field_goal_perc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    free_throws: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    free_throw_att: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    free_throw_perc: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    offense_reb: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    defense_reb: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total_reb: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    assist: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    steals: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    blocks: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    turnovers: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    personal_fouls: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "TeamStats",
  }
);

module.exports = TeamStats;
