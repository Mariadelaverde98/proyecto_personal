const DataTypes = require('sequelize');
const sequelize = require('../databases/mysql').sqlConexion();

const Followers = sequelize.define('FOLLOWERS', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    fk_pk_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    fk_pk_user_follower: {
        type: DataTypes.STRING,
        allowNull: false
    },

    date_: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
});


module.exports = Followers;