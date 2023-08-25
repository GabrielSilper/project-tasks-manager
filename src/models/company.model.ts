import { Schema, model } from 'mongoose';
import ICompany from '../entities/ICompany';

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
});

const CompanyModel = model<ICompany>('Company', CompanySchema);

export default CompanyModel;
