const User = require('../models/User');
const { sendSuccessResponse, sendErrorResponse } = require('../utils/response');

/**
 * Handles the registration of a new user.
 * Validates the user input, checks if the user already exists,
 * creates a new user, and sends a success or error response accordingly.
 * 
 * @param {Object} req - The request object containing the user input data.
 * @param {Object} res - The response object used to send the response back to the client.
 */
const register = async (req, res) => {
    try {
        // Validate user input
        const { error } = User.validateInput(req.body);
        if (error) {
            sendErrorResponse(res, 400, error.details[0].message, error);
            return;
        }

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            sendErrorResponse(res, 400, "User already exists with this email");
            return;
        }

        // Create user
        const user = await User.create(req.body);
        sendSuccessResponse(res, 201, "User created successfully", user);
    } catch (error) {
        console.error('Error creating user:', error);
        sendErrorResponse(res, 500, 'Internal server error', error);
    }
};

module.exports = {
    register
};