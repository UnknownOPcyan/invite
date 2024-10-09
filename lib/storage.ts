// lib/storage.ts
import Invitation from '../models/invitation.model';

let referralId = 1;

interface ReferralData {
  referrals: { [userId: string]: { id: number; name: string }[] };
  referredBy: { [userId: string]: string };
}

let storage: ReferralData = {
  referrals: {},
  referredBy: {},
};

export async function saveReferral(userId: string, referrerId: string, name: string) {
  const invitation = new Invitation({ userId, referrerId, name });
  await invitation.save();
  storage.referrals[referrerId] = storage.referrals[referrerId] || [];
  storage.referrals[referrerId].push({ id: referralId, name });
  storage.referredBy[userId] = referrerId;
  referralId++;
}

export async function getReferrals(userId: string) {
  const invitations = await Invitation.find({ referrerId: userId });
  return invitations.map((invitation) => ({ id: invitation._id, name: invitation.name }));
}

export async function getReferrer(userId: string) {
  const invitation = await Invitation.findOne({ userId });
  return invitation ? invitation.referrerId : null;
}
