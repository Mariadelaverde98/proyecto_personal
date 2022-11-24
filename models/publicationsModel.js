const DataTypes = require('sequelize');
const sequelize = require('../databases/mysql').sqlConexion();

const Publications = sequelize.define('PUBLICATIONS', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fk_pk_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    publication_path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubication: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date_: {
        type: DataTypes.DATE
    }
}, {
    timestamps: false
});


module.exports = Publications;