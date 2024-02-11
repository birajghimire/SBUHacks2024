const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming the token is sent as "Bearer <token>"

    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Add the decoded user payload to the request object
        next();
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }
};

module.exports = authMiddleware;
