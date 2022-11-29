const DataTypes = require('sequelize');

followersModel = {
    create: async (sequelize) => {
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

        return Followers;
    }
}

module.exports = followersModel;