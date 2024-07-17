'use strict';
const { Model } = require('sequelize');
const Product = require('./projectdatabase');
const Post = require("./post")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true, 
      index: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['poster', 'seeker', 'both','pending'],
      allowNull: false,
      defaultValue: 'pending'
    },
    company_name: {
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
      allowNull:false
     },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
  });
  
  return User;

  
};
