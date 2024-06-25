'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Post extends Model {   
      static associate(models) {
        Post.belongsTo(models.User, { foreignKey: 'email' });
      }
  
    }
   
    Post.init({
        Post_Id:{
          type:DataTypes.INTEGER,
          allowNull: false,
          primaryKey:true,
          autoIncrement: true
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
           category_chosen:{
            type:DataTypes.STRING,
            allowNull:false
           },
           industry_size:{
            type:DataTypes.STRING,
            allowNull: false
           },
           email: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
              model: 'User',
              key: 'email'
            }},   
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