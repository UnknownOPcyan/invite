let referralId = 1;

interface ReferralData {
  referrals: { [userId: string]: { id: number; name: string }[] };
  referredBy: { [userId: string]: string };
}

let storage: ReferralData = {
  referrals: {},
  referredBy: {},
};

export function saveReferral(userId: string, referrerId: string, name: string) {
  if (!storage.referrals[referrerId]) {
    storage.referrals[referrerId] = [];
  }
  storage.referrals[referrerId].push({ id: referralId, name });
  storage.referredBy[userId] = referrerId;
  referralId++;
}

export function getReferrals(userId: string) {
  return storage.referrals[userId] || [];
}

export function getReferrer(userId: string) {
  return storage.referredBy[userId] || null;
}
