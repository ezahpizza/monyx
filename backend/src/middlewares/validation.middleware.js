/**
 * Middleware to validate request bodies against a Joi schema.
 * @param {object} schema - The Joi schema to validate against.
 */
const validate = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = { validate };
