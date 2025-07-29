import React, { useState } from 'react';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md space-y-4">
        {isLogin ? <LoginForm /> : <SignupForm setIsLogin={setIsLogin} />}

        <div className="text-center">
          {isLogin ? (
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <FaUserPlus className="text-blue-600" />
              Don't have an account?
              <button
                onClick={() => setIsLogin(false)}
                className="text-blue-600 hover:underline font-medium ml-1"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
              <FaSignInAlt className="text-green-600" />
              Already have an account?
              <button
                onClick={() => setIsLogin(true)}
                className="text-green-600 hover:underline font-medium ml-1"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

