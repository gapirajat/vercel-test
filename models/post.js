'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Post extends Model {}
    Post.init({
        Post_Id:{
          type:DataTypes.INTEGER,
          allowNull: false
        },
        Post_name: {
            type: DataTypes.STRING,
            allowNull: false
          },
        business_type: {
            type: DataTypes.STRING,
            allowNull: false
          },
          location: {
            type: DataTypes.STRING,
            allowNull: false
          },
          maxBudget:{
            type: DataTypes.INTEGER,
            allowNull:false
          },
          minBudget:{
          type: DataTypes.INTEGER,
          allowNull:false
          },
          Duration :{
            type : DataTypes.INTEGER,
            allowNull: false
          },
          YearsOfExperience:{
            type:DataTypes.INTEGER,
            allowNull: false
          },
           skills:{
            type: DataTypes.STRING,
            allowNull: false
           },
           project_Description:{
            type:DataTypes.STRING,
            allowNull:false
           },
           req_list:{
            type:DataTypes.STRING,
            allowNull:false
           },
           catgory_chosen:{
            type:DataTypes.STRING,
            allowNull:false
           },
           industry_size:{
            type:DataTypes.STRING,
            allowNull: false
           },
           CreatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          },
          UpdatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
          }
    },{
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: false
      })
      return Post;
}