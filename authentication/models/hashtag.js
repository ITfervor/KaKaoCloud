const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique:true
            },
         
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hashtag',
            tableName: 'hashtags',
            paranoid: true,
            charset: 'utf8', // utf8mb4 는 이모티콘삽입가능
            collate: 'utf8_general_ci'
        })
    }

    static associate(db) {
        db.Hashtag.belongsToMany(db.Post,{ through: 'PostHashtag' })

    }
} 