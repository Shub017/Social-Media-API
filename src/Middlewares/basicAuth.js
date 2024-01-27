// Middleware to handle Basic Authentication
export const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({ status: "Failed", error: "Invalid Authorization header" });
    }

    // Decode the base64 encoded credentials
    const credentials = Buffer.from(authHeader.split(' ')[1], 'base64').toString('utf-8');
    const [email, password] = credentials.split(':');

    // Attach the decoded credentials to the request object
    req.user = { email, password };
    next();
};