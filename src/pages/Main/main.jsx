import React from 'react';
import { useEffect, useState } from 'react';
import styled from "styled-components";

import axiosInstance from "../../component/jwt.js";
import { useNavigate,Link } from 'react-router-dom';
import TopBar from "../../component/TopBar.js";
import { useEndPointStore } from '../../store.js';
import { TailWindButton } from '../../component/atoms/Button.js';
import CarouselComponent from './Carousel.jsx';
import ProductGrid from './ProductGrid.jsx';

function Main(){
    let navigate = useNavigate();
    const [sort, setSort] = useState(true);
    const [productInfo,setProductInfo] = useState([])
    const [productDesc,setProductDesc] = useState([]);
    const {Endpoint} = useEndPointStore(state => state)
    
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/product/all');
                console.log(response)
                const resopnseLikeDesc = await axiosInstance.get(`/product/all/like/desc`,)
                    setProductInfo(response.data);
                    setProductDesc(resopnseLikeDesc.data.data);
                }
            catch(error) {
            }
        };
        fetchData();
    }, []);

    if(!productInfo){
        return(<div>데이터 로드중..</div>)
    }

    return(
    <div>
        <div>
            <TopBar />
        </div>
        <div className = 'mainContainer' style ={{marginLeft: '20%', marginRight: '20%'}}>
            <div>
                <CarouselComponent product = {productInfo}/>
            </div>
            <div className="min-h-[300px] h-pull mainProduct">
                {sort ?
                    <div>
                    <TailWindButton className = 'bg-white border-0'>✔최신순</TailWindButton><TailWindButton className = 'bg-white border-0' onClick = {() => {setSort(!sort)}}>인기순</TailWindButton>
                    <ProductGrid
                    product = {productInfo}
                    navigate = {navigate}
                    Endpoint = {Endpoint}/>
                    </div> :
                    <div>
                    <TailWindButton className = 'bg-white border-0' onClick = {() => {setSort(!sort)}}>최신순</TailWindButton><TailWindButton className = 'bg-white border-0'>✔인기순</TailWindButton> 
                    <ProductGrid
                    product = {productDesc}
                    navigate = {navigate}
                    Endpoint = {Endpoint}/>
                    </div>
                }
                <ButtonWrapper>
                <button className="bg-transparent hover:bg-blue-500 text-black-700 font-semibold hover:text-white py-2 px-4 border1 border-black-500 hover:border-transparent rounded"
                onClick = {() => {navigate('/products')}} >
                    더보기 
                </button>
                </ButtonWrapper>
            </div>
            <div className = 'designerCarousel'>
                <h4 style = {{fontWeight : '700',textAlign : 'center', marginBottom : '2%'}}>인기 디자이너</h4>
                <CarouselComponent product = {productInfo}/>
            </div>
        </div>
    </div>
    )
}

const ButtonWrapper = styled.div`
    text-align: center;
`


export default Main;