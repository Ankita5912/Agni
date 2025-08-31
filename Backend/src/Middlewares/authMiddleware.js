import JWT from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization']; // <-- FIXED

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  const token = authHeader.split(" ")[1]; // Extract the token
  try {
    const decoded = JWT.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.user = decoded; // store payload in req.user
    next();
  } catch (error) {
    console.error('Authentication failed at middleware:', error);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};