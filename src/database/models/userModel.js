const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(sequelize){
        super.init({
            email: DataTypes.STRING,
            username: DataTypes.STRING,
            password: DataTypes.STRING
        }, {
            sequelize,
            modelName: 'users'
        })
    }
}

module.exports = User;