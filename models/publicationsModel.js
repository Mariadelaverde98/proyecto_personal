const DataTypes = require('sequelize');

publicationModel = {
    create: async (sequelize) => {
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
            title: {
                type: DataTypes.STRING,
                allowNull: true
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

        return Publications;
    }
}

module.exports = publicationModel;