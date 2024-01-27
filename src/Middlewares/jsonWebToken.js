import jwt from 'jsonwebtoken';

// Function to generate a JWT token on user login
export const generateAuthToken = (userId, secretKey, expiresIn) => {
    // Create a payload with user ID
    const payload = { userId };
  
    // Generate a JWT token
    const token = jwt.sign(payload, secretKey, { expiresIn });
  
    return token;
};

// Middleware to verify JWT token on each request
export const verifyAuthToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      // Verify the token and extract the payload
      const decoded = jwt.verify(token, process.env.jwtSecretKey);
  
      // Attach the user ID to the request for further processing
      req.userId = decoded.userId;
  
      next(); // Move to the next middleware or route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Invalid or expired token' });
    }
};

//To check if user is already logged in
export const checkIfAlreadyLoggedIn = (req, res, next)=>{
    const token = req.header('Authorization');
    console.log(token);
    if(!token){
        return false;
    }
    
    try {
        // Verify the token and extract the payload
        const decoded = jwt.verify(token, process.env.jwtSecretKey);
    
        // Attach the user ID to the request for further processing
        req.userId = decoded.userId;
    
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
  