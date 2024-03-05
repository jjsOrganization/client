import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ImageContainer = styled.div`
display: flex;
justify-content: space-between;
width: 500px; /* 각 이미지 박스의 총 너비 */
margin-bottom: 20px;
`;

const ImageBox = styled.div`
width: 240px; /* 각 이미지 박스의 너비 */
height: 240px; /* 각 이미지 박스의 높이 */
border: 1px solid #ccc; /* 테두리 추가 */
display: flex;
align-items: center;
justify-content: center;
`;

const Image = styled.img`
max-width: 100%;
max-height: 100%;
`;

const Input = styled.input`
margin-top: 10px;
margin-bottom: 10px; /* 요구사항에 따라 추가 */
`;

const Button = styled.button`
background-color: black;
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
margin-top: 10px;
`;

const StepContainer = styled.div`
display: flex;
flex-direction: column;
`;

const StepContainerPosition = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
`;

const StepText = styled.div`
margin-right: 10px;
`;

const StepImage = styled.img`
width: 500px;
height: 100px;
`;

const RegisterPortfolio = () => {
const navigate = useNavigate();
const [reformTitle, setReformTitle] = useState('');
const [reformSteps, setReformSteps] = useState([]);
const [beforeImage, setBeforeImage] = useState(null);
const [afterImage, setAfterImage] = useState(null);

// 작업물 등록 함수
const handleRegister = () => {
// 작업물 등록 로직 작성
// 등록한 작업물 정보를 ModifyPortfolio 페이지로 전달하는 코드 추가
navigate("/DesignerMypage/ModifyPortfolio"); // 예시로 페이지 이동 코드 작성
};

// 리폼 과정 추가 함수
const addReformStep = () => {
setReformSteps([...reformSteps, '']); // 빈 문자열로 초기화
};

// 리폼 과정 제거 함수
const removeReformStep = (index) => {
const updatedSteps = [...reformSteps];
updatedSteps.splice(index, 1);
setReformSteps(updatedSteps);
};

// 리폼 과정 입력 변경 함수
const handleChangeStep = (index, value) => {
const updatedSteps = [...reformSteps];
updatedSteps[index] = value;
setReformSteps(updatedSteps);
};

// 리폼 전 이미지 업로드
const handleBeforeImageUpload = (e) => {
const file = e.target.files[0];
const reader = new FileReader();
reader.onload = () => {
    setBeforeImage(reader.result);
};
reader.readAsDataURL(file);
};

// 리폼 후 이미지 업로드
const handleAfterImageUpload = (e) => {
const file = e.target.files[0];
const reader = new FileReader();
reader.onload = () => {
    setAfterImage(reader.result);
};
reader.readAsDataURL(file);
};

return (
<Container>
    <h2>작업물 등록</h2>
    {/* 이미지 업로드 섹션 */}
    <ImageContainer>
    {/* 리폼 전 이미지 */}
    <div>
        <ImageBox>
        <Image src={beforeImage} alt="리폼 전 이미지" />
        </ImageBox>
        <Input
        type="file"
        accept="image/*"
        onChange={handleBeforeImageUpload}
        />
    </div>
    {/* 리폼 후 이미지 */}
    <div>
        <ImageBox>
        <Image src={afterImage} alt="리폼 후 이미지" />
        </ImageBox>
        <Input
        type="file"
        accept="image/*"
        onChange={handleAfterImageUpload}
        />
    </div>
    </ImageContainer>
    {/* 리폼 제목 입력 */}
    <Input
    type="text"
    placeholder="리폼 제목 입력"
    value={reformTitle}
    onChange={(e) => setReformTitle(e.target.value)}
    />
    {/* 리폼 과정 */}
    <h4>리폼 과정</h4>
    {reformSteps.map((step, index) => (
    <StepContainer key={index}>
        <StepContainerPosition>
        <StepText>{`${index + 1}차 리폼`}</StepText>
        <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
            console.log(`${index + 1}차 리폼 이미지 업로드`, e.target.files[0]);
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const imageDataUrl = reader.result;
                setReformSteps(prevSteps => {
                const newSteps = [...prevSteps];
                newSteps[index] = imageDataUrl;
                return newSteps;
                });
            };
            reader.readAsDataURL(file);
            }}
        />
        {/* 리폼 과정 삭제 버튼 */}
        <Button onClick={() => removeReformStep(index)}>삭제</Button>
        </StepContainerPosition>
        {/* 리폼 이미지 */}
        {step && (
        <div>
            <StepImage src={step} alt={`${index + 1}차 리폼 이미지`} />
        </div>
        )}
    </StepContainer>
    ))}
    {/* 리폼 과정 추가 버튼 */}
    <Button onClick={addReformStep}>리폼 과정 추가</Button>
    {/* 작업물 등록 버튼 */}
    <Button onClick={handleRegister}>작업물 등록</Button>
</Container>
);
};

export default RegisterPortfolio;
