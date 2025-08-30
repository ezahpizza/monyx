/**
 * Centralized error handling middleware.
 */
const errorMiddleware = (err, req, res, next) => {
    // Log the error to the console for debugging
    console.error('Global error handler:', err);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        error: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorMiddleware };
