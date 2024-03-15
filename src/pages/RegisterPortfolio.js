import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const RegisterPortfolio = () => {
  const navigate = useNavigate();
  const [portfolio, setPortfolio] = useState({
    explanation: "",
    designerImage: "",
    designerName: "",
  });

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      "X-CSRF-TOKEN": localStorage.getItem("csrfToken"),
    },
  });

  // 작업물 등록 함수
  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append("explanation", portfolio.explanation);
      formData.append("designerImage", portfolio.designerImage);
      formData.append("designerName", portfolio.designerName);
      const response = await axiosInstance.post(
        "/portfolio/designer",
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

  // 디자이너 이미지 업로드 및 변경 함수
  const handleDesignerImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPortfolio({ ...portfolio, designerImage: file });
    };
    reader.readAsDataURL(file);
  };

  console.log(portfolio.designerImage);

  return (
    <Container>
      <h2>작업물 등록</h2>
      {/* 이미지 업로드 섹션 */}
      <ImageContainer>
        {/* 디자이너 이미지 */}
        <div>
          <ImageBox></ImageBox>
          <Input
            type="file"
            accept="image/*"
            onChange={(event) => handleDesignerImageUpload(event)}
          />
        </div>
      </ImageContainer>
      {/* 리폼 제목 입력 */}
      <Input
        type="text"
        name="explanation"
        placeholder="리폼 제목 입력"
        value={portfolio.explanation}
        onChange={(e) =>
          setPortfolio({ ...portfolio, explanation: e.target.value })
        }
      />
      {/* 디자이너 이름 입력 */}
      <Input
        type="text"
        name="name"
        placeholder="디자이너 이름 입력"
        value={portfolio.designerName}
        onChange={(e) =>
          setPortfolio({ ...portfolio, designerName: e.target.value })
        }
      />
      {/* 작업물 등록 버튼 */}
      <Button onClick={handleRegister}>작업물 등록</Button>
    </Container>
  );
};

export default RegisterPortfolio;
