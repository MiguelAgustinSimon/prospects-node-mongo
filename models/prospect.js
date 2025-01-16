import mongoose from 'mongoose';

const prospectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  jobTitle: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  industry: { type: String, required: true },
  companySize: { type: String, required: true },
  score: { type: Number, default: 0 },
});

prospectSchema.pre('save', function (next) {
  this.score = this.yearsOfExperience * 10;
  next();
});

export default mongoose.model('Prospect', prospectSchema);