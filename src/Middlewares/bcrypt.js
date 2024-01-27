import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password) => {
    try {
      // Generate a salt to use during hashing
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
  
      // Hash the password using the generated salt
      const hashedPassword = await bcrypt.hash(password, salt);
  
      return hashedPassword;
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  };

// Function to compare a plaintext password with a hashed password
export const comparePasswords = async (plaintextPassword, hashedPassword) => {
    try {
      // Compare the plaintext password with the hashed password
      const isMatch = await bcrypt.compare(plaintextPassword, hashedPassword);
  
      return isMatch;
    } catch (error) {
      console.error('Error comparing passwords:', error);
    }
  };