import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const tokenMethod = {
    authenticateToken(req, res, next) {
        // Gather the jwt access token from the request header
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401) // if there isn't any token
    
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
          console.log(err)
          if (err) return res.sendStatus(403)
          req.user = user
          next();
        })
      }
}

export default tokenMethod;