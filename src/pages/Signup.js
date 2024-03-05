import { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Signup.css';

function Signup() {
const [formData, setFormData] = useState({
userSep : '',
password: '',
rePassword: '',
name: '',
email: '',
address: '',
phoneNumber: '',
businessNumber: '',
storeAddress: '',
storeName: '',
});

console.log(formData);

const handleSubmit = (e) => {
e.preventDefault(); //폼 제출 막음

// 서버로 보낼 데이터
const postData = {
    userSep : formData.userSep,
    password: formData.password,
    rePassword: formData.rePassword,
    name: formData.name,
    email: formData.email,
    address: formData.address,
    phoneNumber: formData.phoneNumber,
    businessNumber: formData.businessNumber,
    storeAddress: formData.storeAddress,
    storeName: formData.storeName
};

// POST 요청
axios.post('백엔드 엔드포인트', postData)
    .then(response => {
    console.log('회원가입 성공:', response.data);
    })
    .catch(error => {
    console.error('회원가입 실패:', error);
    //error에 따라서 반응 표현 만들면 될 듯?
    });
};

const handleUserSepChange = (e) => {
setFormData(prevState => ({
    ...prevState,
    userSep: e.target.value,
}));
};

const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prevState => ({
    ...prevState,
    [name]: value,
}));
};

return (
<div>
    <div className="signupTitle"><h4>회원가입</h4></div>
    <form onSubmit={handleSubmit}>
    <div className="SignUp1"><span className="SignUp3">회원구분</span>
    <label><input
        type="radio"
        name="userSep"
        value="purchaser"
        checked={formData.userSep === 'purchaser'}
        onChange={handleUserSepChange}
    /><span className="SignUp4">일반회원</span></label>
    <label><input
        type="radio"
        name="userSep"
        value="seller"
        checked={formData.userSep === 'seller'}
        onChange={handleUserSepChange}
    /><span className="SignUp4">판매자</span></label>
    <label><input
        type="radio"
        name="userSep"
        value="designer"
        checked={formData.userSep === 'designer'}
        onChange={handleUserSepChange}
    /><span className="SignUp4">디자이너</span></label>
    </div>
    <div className="SignUp5"><h5>기본정보</h5></div>
    <div>
        {formData.userSep === 'purchaser' && (
            <div>
                <div className="SignUp2">
                <label><span className="SignUp3">이메일</span>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">비밀번호</span>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">비밀번호 확인</span>
                    <input
                    type="password"
                    name="rePassword"
                    value={formData.rePassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">이름</span>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">주소</span>
                    <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="주소"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">휴대전화</span>
                    <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="핸드폰 번호"
                    /></label></div>
            </div>
            )}
            {formData.userSep === 'seller' && (
            <div>
                <div className="SignUp2">
                <label><span className="SignUp3">이메일</span>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">비밀번호</span>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="비밀번호"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">비밀번호 확인</span>
                    <input
                    type="password"
                    name="rePassword"
                    value={formData.rePassword}
                    onChange={handleChange}
                    placeholder="비밀번호 확인"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">이름</span>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">주소</span>
                    <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="주소"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">휴대전화</span>
                    <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="핸드폰 번호"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">회사전화</span>
                    <input
                    type="text"
                    name="businessNumberr"
                    value={formData.businessNumber}
                    onChange={handleChange}
                    placeholder="회사 전화번호"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">회사주소</span>
                    <input
                    type="text"
                    name="storeAddress"
                    value={formData.storeAddress}
                    onChange={handleChange}
                    placeholder="회사주소"
                /></label></div>
                <div className="SignUp2">
                <label><span className="SignUp3">회사명</span>
                    <input
                    type="text"
                    name="storeName"
                    value={formData.storeName}
                    onChange={handleChange}
                    placeholder="회사명"
                /></label></div>                
            </div>
                )}
                {formData.userSep === 'designer' && (
                <div>
                    <div className="SignUp2">
                    <label><span className="SignUp3">이메일</span>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일"
                    /></label></div>
                    <div className="SignUp2">
                    <label><span className="SignUp3">비밀번호</span>
                        <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    /></label></div>
                    <div className="SignUp2">
                    <label><span className="SignUp3">비밀번호 확인</span>
                        <input
                        type="password"
                        name="rePassword"
                        value={formData.rePassword}
                        onChange={handleChange}
                        placeholder="비밀번호 확인"
                    /></label></div>
                    <div className="SignUp2">
                    <label><span className="SignUp3">이름</span>
                        <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="이름"
                    /></label></div>
                    <div className="SignUp2">
                    <label><span className="SignUp3">주소</span>
                        <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="주소"
                    /></label></div>
                    <div className="SignUp2">
                    <label><span className="SignUp3">휴대전화</span>
                        <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="핸드폰 번호"
                    /></label></div>
                </div>
                )}
            </div>
            <div className="Submit-button">
            <button type="submit">가입하기</button>
            </div>
        </form>
    </div>
);
}

export default Signup;