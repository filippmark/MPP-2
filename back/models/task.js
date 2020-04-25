const { Sequelize } = require("sequelize");
const { DataTypes } = require("sequelize");
const user = require('./user');

const sequelize = new Sequelize("mydb", "root", "1201", {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
});

const task = sequelize.define("task", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  progress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
        model: user,
        key: 'id'
    }
  },
});

(async () => {
    await task.sync();
})()
  

module.exports = task;
