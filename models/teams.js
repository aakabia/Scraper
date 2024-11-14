const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../config/connection");


class Teams extends Model {}

Teams.init(
  {
    

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    team_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    

 
   
  },

  {
    
    sequelize, 
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "Teams", 
  }
);



module.exports = Teams;