import React, { useState } from 'react';
import EmailField from '../molecules/EmailField.js';
import PasswordField from '../molecules/PasswordField.js';
import Button from '../atoms/Button';
import axiosInstance from '../component/jwt';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        memberId: userEmail,
        password: password,
      });
      if (response.data && response.data.data.accessToken) {
        localStorage.setItem('memberId', userEmail);
        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('refreshToken', response.data.data.refreshToken);
        document.cookie = `accessToken=${response.data.data.accessToken}; path=/;`;
        navigate('/');
      } else {
        
      }
    } catch (error) {
      window.alert('이메일 혹은 비밀번호가 틀렸습니다. 다시 입력하세요.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <EmailField value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" label="로그인" />
    </form>
  );
};

export default LoginForm;