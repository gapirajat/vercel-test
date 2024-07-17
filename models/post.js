'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Post extends Model {   
      static associate(models) {
        Post.belongsTo(models.User, { foreignKey: 'email' });
      }
  
    }
   
    Post.init({
      location: {
        type: DataTypes.STRING,
        allowNull: false
      },
      budget_l:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      budget_h:{
        type: DataTypes.INTEGER,
        allowNull:false
      },
      duration_l:{
        type : DataTypes.INTEGER,
        allowNull: false
      },
      duration_h:{
        type : DataTypes.INTEGER,
        allowNull: false
      },
      exp:{
        type:DataTypes.INTEGER,
        allowNull: false
      },
       skill:{
        type: DataTypes.JSON,
        allowNull: true
       },
       project_desc:{
        type:DataTypes.STRING,
        allowNull:false
       },
       project_size:{
        type:DataTypes.CHAR,
        allowNull: false
       },
       sector_p: {
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue: 'pending'
       },
       email: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'users',
          key: 'email'
        },
        primaryKey:true,
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