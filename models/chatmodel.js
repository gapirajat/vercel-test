'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      //Chat.belongsTo(models.User, { as: 'sender', foreignKey: 'senderId' });
      //Chat.belongsTo(models.User, { as: 'receiver', foreignKey: 'receiverId' });
    }
  }
  
  Chat.init({
    chatId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Chat',
    tableName: 'chats',
    timestamps: true 
  });
  
  return Chat;
};
