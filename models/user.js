'use strict';
const { Model } = require('sequelize');
const Product = require('./projectdatabase');
const Post = require("./post");
const Chat = require('./chatmodel');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'email' });

      User.hasMany(models.Chat, { foreignKey: 'sender', as: 'send' });
      User.hasMany(models.Chat, { foreignKey: 'receiver', as: 'receive' });
    }
  }
  
  User.init({
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, 
      index: true, 
      primaryKey:true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
      index: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cin: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
      unique: true
    },
    status: {
      type: DataTypes.ENUM,
      values: ['poster', 'seeker', 'both','pending'],
      allowNull: false,
      defaultValue: 'pending'
    },
    company_name: {//profile
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    size:{
      type: DataTypes.ENUM,
      values: ['L', 'M', 'S','pending'],
      allowNull: false,
      defaultValue: 'pending'
     },
     sector: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue: 'pending'
     },
     company_desc:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue: 'pending'
     },
     location:{
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue: 'pending'
     },
     c_email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true, 
      index: true, 
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    social: {
      type: DataTypes.JSON,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  
  return User;

  
};
