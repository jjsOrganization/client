import React from 'react';
import LoginForm from '../components/template/LoginForm';

const LoginPage = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="container">
      <div className="Login">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          {/* <Logo /> */}
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <LoginForm />
            <p className="mt-10 text-center text-sm text-gray-500">
              회원이 아니신가요?{' '}
              <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                회원가입 하러가기
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;