import { TokenPayload } from './TokenPayload';

export default interface TokenFunctions {
  createToken(data: TokenPayload): string;
  verifyToken(token: string): TokenPayload;
}
