'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState({ username: '', avatar: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleSave = async () => {
    await setDoc(doc(db, 'users', user.uid), {
      username: profile.username,
      avatar: profile.avatar,
      lastUpdated: new Date()
    });
  };

  return (
    <div>
      <input 
        value={profile.username} 
        onChange={(e) => setProfile({...profile, username: e.target.value})}
        placeholder="Choose a username"
      />
      <button onClick={handleSave}>Save Profile</button>
    </div>
  );
}
