import mongoose from 'mongoose';
import CompanyModel from '../models/company.model';

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string, {
      authSource: 'admin',
    });
    console.log('Good connection with database');
  } catch (error) {
    console.log(`You have a trouble with the connection: ${error}`);
  }

  await CompanyModel.deleteMany({});
  await CompanyModel.insertMany([{ name: 'Workmize' }]);
};

seed().then(() => mongoose.connection.close());
