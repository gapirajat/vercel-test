const Sequelize = require("sequelize");

const sequelize = new Sequelize("Database1", "Abhishek", "Root",{
    dialect:"mysql",
    host:"127.0.0.1",
});

module.exports = sequelize;