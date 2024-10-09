// models/invitation.model.ts
import mongoose, { Schema } from 'mongoose';

const invitationSchema = new Schema({
  userId: { type: String, required: true },
  referrerId: { type: String, required: true },
  name: { type: String, required: true },
  invitedAt: { type: Date, default: Date.now },
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;
