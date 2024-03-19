import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ProfileSection = styled.div`
display: flex;
align-items: flex-start;
margin-bottom: 20px;
`;

const ProfileImage = styled.img`
width: 300px;
height: 225px;
margin-right: 20px;
`;

const DesignerIntro = styled.div`
max-width: 600px;
`;

const Textarea = styled.textarea`
width: 100%;
height: 100px;
margin-bottom: 10px;
`;

const Button = styled.button`
background-color: black;
color: white;
padding: 10px 20px;
border: none;
border-radius: 5px;
cursor: pointer;
margin-right: 10px;
`;

const Table = styled.table`
border-collapse: collapse;
width: 100%;
`;

const Th = styled.th`
border: 1px solid black;
padding: 8px;
`;

const Td = styled.td`
border: 1px solid black;
padding: 8px;
`;

const Input = styled.input`
width: 80px;
`;

const FileInput = styled.input`
margin-top: 10px;
`;

const ModifyPortfolio = () => {
const portfolidId = useParams()
const navigate = useNavigate();
const [designerIntro, setDesignerIntro] = useState("소개글을 작성해주세요.");
const [profileImage, setProfileImage] = useState(""); // 프로필 사진 상태 추가
const [portfolio, setPortfolio] = useState({
    explanation: "",
    designerImage: "",
    designerName: "",
});

// 디자이너 소개글 수정 상태
const [isEditingIntro, setIsEditingIntro] = useState(false);

// 수정 완료 버튼 클릭 시 소개글 수정 완료
const handleFinishEditingIntro = () => {
setIsEditingIntro(false);
// 수정된 소개글을 저장하거나 다른 작업을 수행할 수 있습니다.
};

// 프로필 사진 업로드 및 변경 함수
const handleImageUpload = (event) => {
const imageFile = event.target.files[0];
const imageUrl = URL.createObjectURL(imageFile);
setProfileImage(imageUrl);
};

// 작업물 등록 페이지로 이동하는 함수
const gotoRegisterPage = () => {
navigate("/DesignerMypage/ModifyPortfolio/RegisterPortfolio");
};

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
});

const handleRegister = async () => {
    try {
    const formData = new FormData();
    formData.append("explanation", portfolio.explanation);
    formData.append("designerImage", portfolio.designerImage);
    formData.append("designerName", portfolio.designerName);
    const response = await axiosInstance.put(
        `/portfolio/designer/${portfolidId}`,
        formData,
        {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        }
    );
      console.log(formData); // 데이터 확인용
    } catch (error) {
    console.log("데이터 전송 실패", error);
    }
};



return (
<Container>
    <h2>디자이너 포트폴리오 수정</h2>
    
    {/* 디자이너 사진 & 소개글 */}
    <ProfileSection>
    <ProfileImage src={profileImage} alt="프로필 이미지" />
    <DesignerIntro>
        <h3>디자이너 소개</h3>
        {/* 수정 버튼 클릭 시 소개글 수정 가능 */}
        {isEditingIntro ? (
        <>
            <Textarea 
            value={designerIntro}
            onChange={(e) => setDesignerIntro(e.target.value)}
            />
            <Button onClick={handleFinishEditingIntro}>수정 완료</Button>
        </>
        ) : (
        <>
            <p>{designerIntro}</p>
            <Button onClick={() => setIsEditingIntro(true)}>수정</Button>
        </>
        )}
    </DesignerIntro>
    </ProfileSection>
    
    {/* 프로필 사진 업로드 입력란 */}
    <FileInput type="file" accept="image/*" onChange={handleImageUpload} />
    
    {/* 리폼 가격표 */}
    <h3>리폼 가격표</h3>
    <Table>
    <thead>
        <tr>
        <Th>리폼부분</Th>
        <Th>가격</Th>
        <Th>리폼부분</Th>
        <Th>가격</Th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <Td>디자인</Td>
        <Td>
            {/* 가격 입력란 */}
            <Input type="text" placeholder="가격 입력" />
        </Td>
        <Td>기장</Td>
        <Td>
            {/* 가격 입력란 */}
            <Input type="text" placeholder="가격 입력" />
        </Td>
        </tr>
        <tr>
        <Td>사이즈</Td>
        <Td>
            {/* 가격 입력란 */}
            <Input type="text" placeholder="가격 입력" />
        </Td>
        <Td>장식</Td>
        <Td>
            {/* 가격 입력란 */}
            <Input type="text" placeholder="가격 입력" />
        </Td>
        </tr>
        {/* 필요한 만큼 행 추가 */}
    </tbody>
    </Table>
    
    {/* 작업물 리스트 */}
    <h2>작업물 리스트</h2>
    
    {/* 작업물 등록 버튼 */}
    <Button onClick={gotoRegisterPage}>작업물 등록</Button>
</Container>
);
};

export default ModifyPortfolio;