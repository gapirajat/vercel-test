'use strict';
const { Model} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
    class Post extends Model {   
      static associate(models) {
        Post.belongsTo(models.User, { foreignKey: 'email' });
        
        Post.hasMany(models.Chat, { foreignKey: 'pid', as: 'postid' });
      }
  
    }
   
    Post.init({
      pid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, 
        index: true, 
        primaryKey:true,
        autoIncrement: true
      },
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
        type: DataTypes.JSONB,
        allowNull: true
       },
       project_desc:{
        type:DataTypes.STRING,
        allowNull:false
       },
       project_size:{
        type:DataTypes.STRING,
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
        }
      }
},{
        sequelize,
        modelName: 'Post',
        tableName: 'posts',
        timestamps: true
      })
      return Post;
}

//updtae email to uid as primary key