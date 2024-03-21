import React from 'react';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import axios from 'axios'
import { Routes, Route, useNavigate } from 'react-router-dom';
import "../js/TopBar.js";
import TopBar from "../js/TopBar.js";


function Main(){
    const [sort, setSort] = useState(true);
    const [productDesc,setProductDesc] = useState();
    const [productInfo,setProductInfo] = useState()

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
    });
    const Endpoint = 'https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/product/all', {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }
                });
                const resopnseLikeDesc = await axiosInstance.get(`/product/all/like/desc`,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    }})
                    setProductInfo(response.data);
                    setProductDesc(resopnseLikeDesc.data.data);
                    console.log('상품 데이터 확인')
                    console.log(productInfo)
                }
            catch(error) {
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

    let carouselImage = ([
        'https://i.postimg.cc/5yvZCPM1/1.png',
        'https://i.postimg.cc/x19WXypD/2.png',
        'https://i.postimg.cc/wTYKpdhB/3.png',
        'https://i.postimg.cc/MptgVMgc/4.png',
        'https://i.postimg.cc/jq7Vmjn9/5.png',
        'https://i.postimg.cc/28QsjXw7/6.png',
        'https://i.postimg.cc/0NQFf5qV/7.png'])
    
    return(
    <div>
        <div>
            <TopBar />
        </div>
        <div className = 'mainContainer' style ={{marginLeft: '20%', marginRight: '20%'}}>
            <div>
                <CarouselC product = {productInfo} carouselStyle = {contentStyle} carouselImage = {carouselImage}/>
            </div>
            <div class="mainProduct">
            <h4 style = {{color : 'grey',fontWeight : '700',textAlign : 'center', marginBottom : '2%', marginTop : '5%'}}>상품</h4>
                {productInfo === null? 
                <><div style = {{marginBottom : '3%'}}><button onClick = {() => {setSort(true)}}>최신순</button> <button onClick = {() => {setSort(false)}}>인기순</button></div>
                {sort ? <MainProduct Endpoint = {Endpoint} product = {productInfo}></MainProduct> : <MainProduct Endpoint = {Endpoint} product = {productDesc}></MainProduct>} </>: 
                <><p style = {{display : 'flex',height : '300px',marginTop : '2%',justifyContent: 'center',alignItems: 'center',color : 'darkgrey'}}>등록된 상품이 존재하지 않습니다</p></>}
            </div>
            <div className = 'designerCarousel'>
                <h4 style = {{fontWeight : '700',textAlign : 'center', marginBottom : '2%'}}>인기 디자이너</h4>
                <CarouselC product = {productInfo} carouselStyle = {contentStyle} carouselImage = {carouselImage}/>
            </div>
            <input type = 'file'></input>
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
            <div class="col-6 col-md-4" key={i} style = {{ height : '300px'}}>     
    {   
        props.product[i].imgUrl ?
        (<img referrerpolicy="no-referrer" width = '100%' height = '70%' src = {props.Endpoint + props.product[i].imgUrl} style = {{marginRight : '5%'}} onClick={() => { navigate(`detail/${props.product[i].id}`) }}/>) : 
        (<p onClick={() => { navigate(`detail/${props.product[i].id}`) }} > 이미지 준비중 </p>)}
        <h4>{props.product[i].productName}</h4>
        </div>
        )})
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
            <img src={image} style={{ width: '100%', height: '100%' }} onClick = {() => { navigate(`detail/${props.product[index].id}`)}} />
            </h3>
        </div>
        ))}
    </Carousel>
    )
}

export default Main;