import ServiceData from '../entities/ServiceData';
import TokenFunctions from '../entities/TokenFunctions';
import CompanyModel from '../models/company.model';
import UserModel from '../models/user.model';
import httpStatus from 'http-status';
import TokenJwt from '../utils/TokenJwt';
import { Token } from '../entities/Token';
import { TokenPayload } from '../entities/TokenPayload';
import IUser, { UserDTO } from '../entities/IUser';
import Encrypter from '../entities/Encrypter';
import Bcrypt from '../utils/Bcrypt';

export default class UserService {
  constructor(
    private userModel = UserModel,
    private companyModel = CompanyModel,
    private jwtToken: TokenFunctions = new TokenJwt(),
    private bcrypt: Encrypter = new Bcrypt(),
  ) {}

  async create(newUser: UserDTO): Promise<ServiceData<Token>> {
    const encryptedPassword = await this.bcrypt.encrypt(newUser.password);

    const createdUser = await this.userModel.create({
      ...newUser,
      password: encryptedPassword,
    });
    await this.companyModel
      .find({ name: 'Workmize' })
      .updateOne({ $push: { users: createdUser._id } });

    const tokenPayload: TokenPayload = {
      _id: createdUser._id,
      email: createdUser.email,
      role: createdUser.role,
    };
    const token = this.jwtToken.createToken(tokenPayload);

    return { error: null, status: httpStatus.CREATED, data: { token } };
  }

  async getAll(): Promise<ServiceData<IUser[]>> {
    const users = await this.userModel.find({}, { _id: 1, name: 1 });

    return { error: null, status: httpStatus.OK, data: users };
  }
}
