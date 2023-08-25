import { Schema, model } from 'mongoose';
import ICompany from '../entities/ICompany';

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
});

const CompanyModel = model<ICompany>('Company', CompanySchema);

export default CompanyModel;
