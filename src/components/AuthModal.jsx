'use client';
import { useState } from 'react';
import { auth, RecaptchaVerifier } from '@/lib/firebase';
import { signInWithPhoneNumber, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';

export default function AuthModal({ onClose }) {
  const [phone, setPhone] = useState('+91');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    try {
      const recaptcha = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      setConfirmationResult(confirmation);
      setShowOtpField(true);
      toast.success('OTP sent!');
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      await confirmationResult.confirm(otp);
      toast.success('Logged in successfully!');
      onClose();
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Sign Up/Login</h2>
        
        {/* Phone Login */}
        <form onSubmit={handlePhoneSubmit}>
          <label className="block mb-2">Indian Mobile Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="+91XXXXXXXXXX"
            required
          />
          <div id="recaptcha-container"></div>
          {!showOtpField && (
            <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
              Send OTP
            </button>
          )}
        </form>

        {showOtpField && (
          <form onSubmit={handleOtpSubmit} className="mt-4">
            <label className="block mb-2">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
              Verify OTP
            </button>
          </form>
        )}

        <div className="my-4 text-center">OR</div>

        {/* Email Login */}
        <form onSubmit={handleEmailSubmit}>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            placeholder="user@example.com"
            required
          />
          <button type="submit" className="bg-purple-500 text-white p-2 rounded w-full">
            Continue with Email
          </button>
        </form>

        <button onClick={onClose} className="mt-4 text-gray-500 w-full">
          Close
        </button>
      </div>
    </div>
  );
}
