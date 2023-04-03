import jwt, { SignOptions} from "jsonwebtoken";
import config from 'config';

/*
* Buffer.from() method was to convert the keys from base64
* back into their original state which in ASCII
* */
export const signJwt = (payload: Object, options: SignOptions = {}) => {
    const privateKey = Buffer.from(
        config.get<string>('accessTokenPrivateKey'),
        'base64'
    ).toString('ascii');
    return jwt.sign(payload, privateKey, {
        ...(options && options),
        algorithm: 'RS256'
    });
}

export const verifyJwt = <T>(token: string): T | null => {
    try {
        const publicKey = Buffer.from(
            config.get<string>('accessTokenPublicKey'),
            'base64'
        ).toString('ascii');
        return jwt.verify(token, publicKey) as T;
    } catch (e: any) {
        return null
    }
}
