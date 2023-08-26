import mongoose from 'mongoose';
import CompanyModel from '../models/company.model';
import UserModel from '../models/user.model';
import TaskModel from '../models/task.model';

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string, {
      authSource: 'admin',
    });
    console.log('Sending data to the database...');
  } catch (error) {
    console.log(`You have a trouble with the connection: ${error}`);
  }

  await CompanyModel.deleteMany({});
  await UserModel.deleteMany({});
  await TaskModel.deleteMany({});
  await CompanyModel.insertMany([{ name: 'Workmize', users: [], tasks: [] }]);
  console.log('Data has been successfully inserted!');
};

seed().then(() => mongoose.connection.close());
