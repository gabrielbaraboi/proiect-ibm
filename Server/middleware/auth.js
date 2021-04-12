import jwt from 'jsonwebtoken';
import config from 'config';


export const auth = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({ msg: 'Authorization denied' });
    } 
    
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
    
}