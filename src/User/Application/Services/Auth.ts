import jwt from "jsonwebtoken";

export default class AuthServices {
    private secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    ValidateToken(token: string) {
        try {
            return jwt.verify(token, this.secret) as jwt.JwtPayload;
        } catch (error) {
            return false;
        }
    }

    GenerateToken(password: string) {
        return jwt.sign({ id: password }, this.secret, { expiresIn: 86400 })
    }
}