import jwt from 'jsonwebtoken';
import User from '../Interfaces/user.interface';

const signJWT = (user: User, callback: (error: Error | null, token: String | null) => void): void => {
    var currentTime = new Date().getTime();
    var expirationTimeInMS = (currentTime + 3600)*100000;
    var expirationTimeInSeconds = Math.floor(expirationTimeInMS / 1000);

    console.log(`Attempting to sign token for ${user.email}`);
    
    try {
        jwt.sign({
            email: user.email,
            password: user.password
        },
        "superencryptedsecret",
        {
            issuer: "BayTreeDevs",
            algorithm: "HS256",
            expiresIn: expirationTimeInSeconds
        },
        (error, token) => {
            if (error) {
                callback(error, null);
            } else if (token) {
                callback(null, token);
            }
        })
    } catch (e) {
        console.log("Error. Please ctrl+f to see where this is.\n");
    }
}

export default signJWT;