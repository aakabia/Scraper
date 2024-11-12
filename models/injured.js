const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");

class Injured extends Model {}

Injured.init(
  {
    

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    injured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },

    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    player_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Player",
          key: "player_id",
        },
    },
    

    teamInjuredPlayer: {
      type: DataTypes.JSON,
      //JSON data type for json data 
      allowNull: false,
    },

   

  },

  {
    
    sequelize, 
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Injured", 
  }
);


module.exports = Injured;