const { Model, DataTypes } = require("sequelize");
const { Sequelize } = require("sequelize");
const bcrypt = require('bcrypt');

const sequelize = new Sequelize("mydb", "root", "1201", {
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
});

class User extends Model {
  validPassword(password, cb) {
    bcrypt.compare(password, this.password, (err, res) => {
      if (err) return cb(err, false);
      return cb(null, res);
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
    tableName: "users",
    sequelize,
  }
);


(async () => {
  await User.sync();
})()

module.exports = User;
