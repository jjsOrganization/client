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
import { useQuery } from '@tanstack/react-query';

function Main(){
    let navigate = useNavigate();
    const [sortType, setSortType] = useState('최신순');
    const [productInfo,setProductInfo] = useState([])
    const [productDesc,setProductDesc] = useState([]);
    const {Endpoint} = useEndPointStore(state => state)

    const getAllList = async() => {
        if(sortType === '최신순'){
            const response = await axiosInstance.get('/product/all');
            return response;
        }else{
            const response = await axiosInstance.get(`/product/all/like/desc`,)
            return response;
        }
        
    }

    const {isLoading, error, data, isFetching} = useQuery({
        queryKey:[sortType],
        queryFn: getAllList
    })

   

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return(
    <div>
        <div>
            <TopBar />
        </div>
        {/* <div className = 'mainContainer' style ={{marginLeft: '20%', marginRight: '20%'}}>
            <div style = {{marginBottom : '10px'}}>
                <CarouselComponent product = {productInfo}/>
            </div>
            <div className="min-h-[300px] h-pull mainProduct ">
                {sortType === '최신순' ?
                    <div>
                    <TailWindButton className = 'bg-white border-0'>✔최신순</TailWindButton><TailWindButton className = 'bg-white border-0' onClick = {() => {setSortType('인기순')}}>인기순</TailWindButton>
                    <ProductGrid
                    product = {data?.data}
                    navigate = {navigate}
                    Endpoint = {Endpoint}/>
                    </div> :
                    <div>
                    <TailWindButton className = 'bg-white border-0' onClick = {() => {setSortType('최신순')}}>최신순</TailWindButton><TailWindButton className = 'bg-white border-0'>✔인기순</TailWindButton> 
                    <ProductGrid
                    product = {data?.data?.data}
                    navigate = {navigate}
                    Endpoint = {Endpoint}/>
                    </div>
                }
                <ButtonWrapper>
                <button className="bg-transparent hover:bg-blue-500 text-black-700 font-semibold hover:text-white py-2 px-4 border1 border-black-500 hover:border-transparent rounded"
                onClick = {() => {navigate('/products')}} >
                    더보기 
                </button>
                <hr style = {{border : '1px solid gray'}}/>
                </ButtonWrapper>
            </div>
            
        </div> */}
    </div>
    )
}

const ButtonWrapper = styled.div`
    text-align: center;
`


export default Main;