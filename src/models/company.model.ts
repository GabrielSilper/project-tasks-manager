import { Schema, model } from 'mongoose';
import ICompany from '../entities/ICompany';

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'tasks' }],
});

const CompanyModel = model<ICompany>('Company', CompanySchema);

export default CompanyModel;
