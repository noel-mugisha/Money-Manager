// frontend/src/pages/EmailVerification.jsx

import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, MailQuestion } from 'lucide-react';
import { assets } from '../assets/assets';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const statusParam = searchParams.get('status');
    const messageParam = searchParams.get('message');
    
    setStatus(statusParam);
    if (statusParam === 'success') {
      setMessage('Your account has been successfully verified.');
    } else if (statusParam === 'error') {
      setMessage(messageParam || 'Something went wrong during verification.');
    }
  }, [searchParams]);

  const getStatusContent = () => {
    switch (status) {
      case 'success':
        return {
          icon: <CheckCircle2 className="h-16 w-16 text-green-500" />,
          title: 'Verification Successful!',
          bgColor: 'bg-green-50',
          textColor: 'text-green-800',
        };
      case 'error':
        return {
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          title: 'Verification Failed',
          bgColor: 'bg-red-50',
          textColor: 'text-red-800',
        };
      default:
        return {
          icon: <MailQuestion className="h-16 w-16 text-yellow-500 animate-pulse" />,
          title: 'Verifying...',
          bgColor: 'bg-yellow-50',
          textColor: 'text-yellow-800',
          message: 'Please wait while we verify your account.'
        };
    }
  };

  const { icon, title, bgColor, textColor, message: defaultMessage } = getStatusContent();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="flex items-center gap-2 mb-8">
        <img src={assets.logo} alt="Money Manager Logo" className="h-10 w-10" />
        <span className="text-xl font-semibold text-gray-800">Money Manager</span>
      </div>
      
      <div className={`w-full max-w-md p-8 text-center rounded-2xl shadow-lg ${bgColor}`}>
        <div className="flex justify-center mb-6">
          {icon}
        </div>
        <h1 className={`text-3xl font-bold ${textColor}`}>{title}</h1>
        <p className="mt-4 text-gray-600">
          {message || defaultMessage}
        </p>

        {status && (
          <div className="mt-8">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:bg-purple-800 transform hover:scale-105 transition-all duration-300"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;