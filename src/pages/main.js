import React from 'react';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import axiosInstance from "./jwt.js";
import { useNavigate } from 'react-router-dom';
import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";
import { Fragment } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'


function Main(){
    const [sort, setSort] = useState(true);
    const [productDesc,setProductDesc] = useState();
    const Endpoint = 'https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/'
    const filters = [
        {
        id: '정렬 방식',
        name: '정렬 방식',
        options: [
            { value: '인기순', label: '인기순', checked: false },
            { value: '최신순', label: '최신순', checked: false },
        ],
        },]
    const [open,setOpen] = useState(false);

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

    const [productInfo,setProductInfo] = useState([{}])
    
    return(
    <div>
        <div>
            <TopBar />
        </div>
        <div className = 'mainContainer' style ={{marginLeft: '20%', marginRight: '20%'}}>
            <div>
                <CarouselC product = {productInfo} carouselStyle = {contentStyle} carouselImage = {carouselImage}/>
            </div>
            <div className="mainProduct">
                {productInfo ? 
                <><h4 style = {{color : 'grey',fontWeight : '700',textAlign : 'center', marginBottom : '2%'}}>상품</h4>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3%' }}><Disclosure style = {{ justifyContent : 'flex-end'}} as="div" className="border-1 border-blue-500 py-6 w-22">
{({ open }) => (
    <>
    <h3 className="-my-3 flow-root">
        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 border-1 border-blue-500 h-10">
        <span className="font-medium text-gray-900">{filters[0].name}</span>
        <span className="ml-6 flex items-center">
        </span>
        </Disclosure.Button>
    </h3>
    <Disclosure.Panel className="pt-6">
        <div className="space-y-4">
        {filters[0].options.map((option, optionIdx) => (
            <div key={option.value} className="flex items-center">
            <input
                onClick={() => {optionIdx === 0 ? setSort(true) : setSort(false); setOpen(false)}}
                id={`filter-${filters[0].id}-${optionIdx}`}
                name={`${filters[0].id}[]`}
                defaultValue={option.value}
                type="radio"
                defaultChecked={option.checked}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
                onClick={() => {optionIdx === 0 ? setSort(true) : setSort(false);setOpen(false)}}
                htmlFor={`filter-${filters[0].id}-${optionIdx}`}
                className="ml-3 text-sm text-gray-600"
            >
                {option.label}
            </label>
            </div>
        ))}
        </div>
    </Disclosure.Panel>
    </>
)}
</Disclosure></div>
                {sort ? <MainProduct Endpoint = {Endpoint} product = {productInfo}></MainProduct> : <MainProduct Endpoint = {Endpoint} product = {productDesc}></MainProduct>} </>: 
                '등록된 상품이 존재하지 않습니다'}
            </div>
            <div className = 'designerCarousel'>
                <h4 style = {{fontWeight : '700',textAlign : 'center', marginBottom : '2%'}}>인기 디자이너</h4>
                <CarouselC product = {productInfo} carouselStyle = {contentStyle} carouselImage = {carouselImage}/>
            </div>
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
            <div className="col-6 col-md-4 rounded-lg" key={i} style = {{ height : '300px'}}>     
    {   
        props.product[i].imgUrl ?
        (<img width = '100%' height = '70%' src = {props.Endpoint + props.product[i].imgUrl} style = {{marginRight : '5%'}} onClick={() => { navigate(`detail/${props.product[i].id}`) }}/>) : 
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