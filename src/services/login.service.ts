import httpStatus from 'http-status';
import { Role, UserLoginDTO } from '../entities/IUser';
import { USER_UNAUTHORIZED } from '../entities/ReturnsTypes';
import { Token } from '../entities/Token';
import TokenFunctions from '../entities/TokenFunctions';
import { TokenPayload } from '../entities/TokenPayload';
import UserModel from '../models/user.model';
import TokenJwt from '../utils/TokenJwt';
import ServiceData from '../entities/ServiceData';

export default class LoginService {
  constructor(
    private userModel = UserModel,
    private token: TokenFunctions = new TokenJwt()
  ) {}

  async login(loginDTO: UserLoginDTO): Promise<ServiceData<Token>> {
    const { email, password, role } = loginDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) return USER_UNAUTHORIZED;

    const isPasswordValid = user.password === password;
    const isRoleValid = user.role === role;

    if (!isPasswordValid || !isRoleValid) return USER_UNAUTHORIZED;

    const data: TokenPayload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = this.token.createToken(data);

    return { error: null, status: httpStatus.OK, data: { token } };
  }
}
