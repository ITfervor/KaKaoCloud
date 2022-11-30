const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            Content:{
                type:Sequelize.STRING(200),
                allowNull:false
            },
            img:{
                type:Sequelize.STRING(200),
                allowNull:true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Post',
            tableName: 'posts',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        })
    }

    static associate(db) {
        //User와의 관계 1:N
        db.Post.belongsTo(db.User);
        //Hashtag와는 n:m
        //다대다 관계는 테이블이 생성되는 데 through가 테이블 이름
        db.Post.belongsToMany(db.Hashtag,{through:'PostHashtag'})
        
    }
}

