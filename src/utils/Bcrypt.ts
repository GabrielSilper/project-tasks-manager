import * as theBcrypt from 'bcrypt';
import Encrypter from '../entities/Encrypter';

class Bcrypt implements Encrypter {
  private bcrypt = theBcrypt;

  async encrypt(password: string): Promise<string> {
    const newPassword = await this.bcrypt.hash(password, 10);
    return newPassword;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await this.bcrypt.compare(password, hash);
    return isValid;
  }
}

export default Bcrypt;
