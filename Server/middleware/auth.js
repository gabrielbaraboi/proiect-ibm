import jwt from 'jsonwebtoken';
import config from 'config';


export const auth = (req, res, next) => {
    const token = req.cookies.token;
    console.log(token);
    if(!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    } 
    
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Token is not valid' });
    }
    
}