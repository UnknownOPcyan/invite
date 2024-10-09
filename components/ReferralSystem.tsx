import { useState, useEffect } from 'react'
import { initUtils } from '@telegram-apps/sdk'

interface ReferralSystemProps {
  initData: string
  userId: string
  startParam: string
}

const ReferralSystem: React.FC<ReferralSystemProps> = ({ initData, userId, startParam }) => {
  const [referrals, setReferrals] = useState<string[]>([])
  const [referrer, setReferrer] = useState<string | null>(null)
  const [friends, setFriends] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('referrals')
  const INVITE_URL = `https://t.me/NazunaX_bot/Pixeldrones?start=${userId}&referrer=${userId}`;

  useEffect(() => {
    const checkReferral = async () => {
      if (startParam && userId) {
        try {
          const response = await fetch('/api/referrals', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, referrerId: startParam }),
          });
          if (!response.ok) throw new Error('Failed to save referral');
        } catch (error) {
          console.error('Error saving referral:', error);
        }
      }
    }

    const fetchReferrals = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) throw new Error('Failed to fetch referrals');
          const data = await response.json();
          setReferrals(data.referrals);
          setReferrer(data.referrer);
        } catch (error) {
          console.error('Error fetching referrals:', error);
        }
      }
    }

    const fetchFriends = async () => {
      if (userId) {
        try {
          const response = await fetch(`/api/referrals?userId=${userId}`);
          if (!response.ok) throw new Error('Failed to fetch referrals');
          const data = await response.json();
          setFriends(data.referrals);
        } catch (error) {
          console.error('Error fetching referrals:', error);
        }
      }
    }

    checkReferral();
    fetchReferrals();
    fetchFriends();
  }, [userId, startParam])

  const handleInviteFriend = () => {
    const utils = initUtils()
    const inviteLink = `${INVITE_URL}${userId}`
    const shareText = `Join me on this awesome Telegram mini app!`
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`
    utils.openTelegramLink(fullUrl)
  }

  const handleCopyLink = () => {
    const inviteLink = `${INVITE_URL}${userId}`
    navigator.clipboard.writeText(inviteLink)
    alert('Invite link copied to clipboard!')
  }

  return (
    <div className="w-full max-w-md">
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'referrals' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
          onClick={() => setActiveTab('referrals')}
        >
          Referrals
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'friends' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}
          onClick={() => setActiveTab('friends')}
        >
          Friends
        </button>
      </div>
      {activeTab === 'referrals' && (
        <div>
          {referrer && (
            <p className="text-green-500 mb-4">You were referred by user {referrer}</p>
          )}
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleInviteFriend}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Invite Friend
            </button>
            <button
              onClick={handleCopyLink}
              className ="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Copy Invite Link
            </button>
          </div>
          {referrals.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Your Referrals</h2>
              <ul>
                {referrals.map((referral, index) => (
                  <li key={index} className="bg-gray-100 p-2 mb-2 rounded">
                    User {referral}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      {activeTab === 'friends' && (
        <div>
          {friends.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Friends</h2>
              <ul>
                {friends.map((friend, index) => (
                  <li key={index} className="bg-gray-100 p-2 mb-2 rounded">
                    User {friend}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ReferralSystem
