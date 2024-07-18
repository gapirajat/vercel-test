'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      Chat.belongsTo(models.User, { foreignKey: 'sender', as: 'send' });
      Chat.belongsTo(models.User, { foreignKey: 'receiver', as: 'receive' });
      
      Chat.belongsTo(models.Post, { foreignKey: 'pid', as: 'postid' });
    }
  }
  
  Chat.init({
    cid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, 
      index: true, 
      primaryKey:true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uid'
      }
    }, 
    receiver: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'uid'
      }
    }, 
    pid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'pid'
      }
    }, 
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    timestamps: true 
  });
  
  return Chat;
};
