const DataTypes = require('sequelize');

userModel = {
    create: async (sequelize) => {
        const Users = sequelize.define('USERS', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            name_: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password_: {
                type: DataTypes.STRING,
                allowNull: false
            },
            photo_profile: {
                type: DataTypes.STRING,
                allowNull: true
            },
            date_: {
                type: DataTypes.DATE
            }
        }, {
            timestamps: false
        });

        return Users;

    }
}

module.exports = userModel;