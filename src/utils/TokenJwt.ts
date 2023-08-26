import * as jsonwebtoken from 'jsonwebtoken';
import TokenFunctions from '../entities/TokenFunctions';
import { TokenPayload } from '../entities/TokenPayload';

class TokenJwt implements TokenFunctions {
  private jwt = jsonwebtoken;
  private secret = process.env.JWT_SECRET || 'SECRET';
  private config: jsonwebtoken.SignOptions = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  createToken(data: TokenPayload): string {
    const token = this.jwt.sign(data, this.secret, this.config);
    return token;
  }

  verifyToken(token: string): TokenPayload {
    const data = this.jwt.verify(token, this.secret);
    return data as TokenPayload;
  }
}

export default TokenJwt;
