const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Name is required' },
            len: { args: [2, 255], msg: 'Name must be between 2 and 255 characters' },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Email is required' },
            isEmail: { msg: 'Invalid email format' },
        },
    },
});

module.exports = User;
