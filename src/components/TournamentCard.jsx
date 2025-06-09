'use client';
import { useState } from 'react';
import AuthModal from './AuthModal';

export default function TournamentCard({ tournament }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleJoin = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <div className="border rounded-lg p-4 mb-4">
        {/* ... existing card content ... */}
        <button 
          onClick={handleJoin}
          className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Join
        </button>
      </div>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </>
  );
}
