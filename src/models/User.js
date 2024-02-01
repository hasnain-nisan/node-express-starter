const { DataTypes } = require('sequelize');
const sequelize = require('../db/sequelize');
const Joi = require('joi');

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

// Validate user input using Joi
User.validateInput = (userInput) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().email().required(), 
    });

    return schema.validate(userInput);
};

module.exports = User;
