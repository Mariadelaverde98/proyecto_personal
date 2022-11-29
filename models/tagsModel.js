const DataTypes = require('sequelize');

tagModel = {
    create: async (sequelize) => {
        const Tags = sequelize.define('TAGS', {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            fk_pk_user: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fk_pk_publication: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            timestamps: false
        });

        return Tags;
    }
}

module.exports = tagModel;