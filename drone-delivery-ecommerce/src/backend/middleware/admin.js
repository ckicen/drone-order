const adminMiddleware = (req, res, next) => {
    // Check if the user is authenticated
    if (!req.isAuthenticated() || !req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};

module.exports = adminMiddleware;