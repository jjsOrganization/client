import React from 'react';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import axios from 'axios'
import data from '../data';
import { Routes, Route, useNavigate } from 'react-router-dom';
import "../js/TopBar.js";
import TopBar from "../js/TopBar.js";

function Main(){

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'X-CSRF-TOKEN': localStorage.getItem('csrfToken')
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/product/all', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        'X-CSRF-TOKEN': localStorage.getItem('csrfToken')
                    }
                });
                setProductInfo(response.data);
                console.log(response.data); // 데이터 확인용
            } catch(error) {
                console.log('데이터 로드 실패', error);
            }
        };
    
        fetchData();
    }, []);

    const contentStyle = {
        height: '400px', 
        width: '100%', 
        color: '#fff',
        background: 'white',
    };
    
    const carouselStyle = {
        width : '100%',
        height : '40%'
    };

    let [serverMainImage,setServerMainImage] = useState()

    let [carouselImage, setCarouselImage] = useState([
        'https://i.postimg.cc/5yvZCPM1/1.png',
        'https://i.postimg.cc/x19WXypD/2.png',
        'https://i.postimg.cc/wTYKpdhB/3.png',
        'https://i.postimg.cc/MptgVMgc/4.png',
        'https://i.postimg.cc/jq7Vmjn9/5.png',
        'https://i.postimg.cc/28QsjXw7/6.png',
        'https://i.postimg.cc/0NQFf5qV/7.png'])

    let [mainImage, setMainImage] = useState([
        'https://i.postimg.cc/zfrVFgNL/1.png',
        'https://i.postimg.cc/zv6fbLpG/2.png',
        'https://i.postimg.cc/6QfTjp6M/3.png'
        ])
    
    const [index, setIndex] = useState(0);
    const [productInfo,setProductInfo] = useState([{}])

    return(
    <div className = 'mainContainer'>
        <TopBar />
        <div>
            <CarouselC carouselStyle = {contentStyle} carouselImage = {carouselImage}/>
        </div>
        <div class="mainProduct">
            <h4 style = {{color : 'grey',fontWeight : '700',textAlign : 'center', marginBottom : '2%'}}>인기 상품</h4>
            <MainProduct product = {productInfo} mainImage = {mainImage}></MainProduct>
        </div>
            
        <div className = 'designerCarousel'>
            <h4 style = {{fontWeight : '700',textAlign : 'center', marginBottom : '2%'}}>인기 디자이너</h4>
            <CarouselC  carouselImage = {carouselImage} carouselStyle = {carouselStyle}/>
        </div>
    </div>
    )
}

function MainProduct(props){
    let navigate = useNavigate();
    return(
    <div className = 'row'>
    {
        props.product.map(function(a, i){
        return(
            <div class="col-6 col-md-4" key={i}>
            <img src = {props.mainImage[i]} alt = '이미지 준비중'style = {{width : '100%'}} onClick = {() => {navigate(`detail/${props.product[i].id}`)}}></img>
            <h4>{props.product[i].productName}</h4>
            <p></p>
            </div>
        )
        }
        )
    }
</div>
    )
}

function CarouselC(props)
{
    let navigate = useNavigate();
    return(
    <Carousel autoplay speed>
        {props.carouselImage.map((image, index) => (
        <div key={index}>
            <h3 style={props.carouselStyle}>
            <img src={image} style={{ width: '100%', height: '100%' }} onClick = {() => { navigate('detail/1')}} />
            </h3>
        </div>
        ))}
    </Carousel>
    )
}

export default Main;