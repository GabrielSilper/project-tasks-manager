import { NewEntity } from '../entities';
import IUser from '../entities/IUser';
import ServiceData from '../entities/ServiceData';
import CompanyModel from '../models/company.model';
import UserModel from '../models/user.model';
import httpStatus from 'http-status';

export default class UserService {
  constructor(
    private userModel = UserModel,
    private companyModel = CompanyModel
  ) {}

  async create(newUser: NewEntity<IUser>): Promise<ServiceData<IUser>> {
    const createdUser = await this.userModel.create(newUser);
    await this.companyModel
      .find({ name: 'Workmize' })
      .updateOne({ $push: { users: createdUser._id } });
    return { error: null, status: httpStatus.CREATED, data: createdUser };
  }
}
