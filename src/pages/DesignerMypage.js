import '../css/DesignerMypage.css';
import React, { useState } from 'react';
import exProductURL from "../images/exProduct.jpg"
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap'


import TopBar from "../component/TopBar.js";

let BasicBtn = styled.button`
background : black;
color : white;
width : 120px;
height : 25px;
line-height: 3px;
border-radius: 10px;
`

let ModifyBtn = styled.button`
background : black;
color : white;
width : 200px;
height : 50px;
line-height: 3px;
border-radius: 10px;
`

function DesignerMypage() {
let navigate = useNavigate();

const [reformProducts, setReformProducts] = useState([
{ 
    id: 1, 
    name: '리폼 테스트 상품 1', 
    image: [exProductURL],
    options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
    price: 15000,
    description: '상품 설명',
    date: '2023-11-23(20231123-00024)',
    state: '진행중'
},
{ 
    id: 2, 
    name: '리폼 테스트 상품 2', 
    image: [exProductURL],
    options: '[옵션:단품/블랙/사이즈1 (28~30)/단품구매/단품구매]',
    price: 15000,
    description: '상품 설명',
    date: '2023-11-25(20231125-00002)',
    state: '진행중'
},

]);

return (
<div className='orderReformProduct'>
    <TopBar />
    <h2>마이페이지</h2>
    <div className='reformProduct'>
    <h4>리폼내역</h4>
    <hr className='reformFirstHr'></hr>
    {reformProducts.map((reProduct) => (
        <div key={reProduct.id}>
        <h5>{reProduct.date}</h5>
        <img src={reProduct.image} alt={reProduct.name} />
        <p>{reProduct.name}</p>
        <p>{reProduct.price}원</p>
        <p>{reProduct.options}</p>
        <p>리폼현황 : {reProduct.state} <BasicBtn onClick = {()=> {navigate("/DesignerMypage/ReformState")}}>자세히 보기</BasicBtn></p>
        </div>
    ))}
    </div>
    <div className='reformPortfolio'>
        <h4>포트폴리오</h4> {/* 인기순 정렬 할 것 */}
        <hr></hr>
            <Container>
            <Row>
            <Col><img src = "https://i.postimg.cc/zfrVFgNL/1.png" alt=""/></Col>
            <Col><img src = "https://i.postimg.cc/zfrVFgNL/1.png" alt=""/></Col>
            <Col><img src = "https://i.postimg.cc/zfrVFgNL/1.png" alt=""/></Col>
            </Row>
        </Container>
    </div>
    <div className='ModifyBtn'><ModifyBtn onClick = {()=> {navigate("/DesignerMypage/ModifyPortfolio")}}>포트폴리오 수정</ModifyBtn></div>
</div>
);
}

export default DesignerMypage;