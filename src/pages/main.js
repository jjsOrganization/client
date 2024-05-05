import React from 'react';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import axiosInstance from "../component/jwt.js";
import { useNavigate,Link } from 'react-router-dom';
import TopBar from "../component/TopBar.js";
import { postRefreshToken } from '../component/jwt.js';


function Main(){
    let navigate = useNavigate();
    const [sort, setSort] = useState(true);
    const [productDesc,setProductDesc] = useState();
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
                }
            catch(error) {
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
    "https://i.postimg.cc/jd4cY735/3.png",
    "https://i.postimg.cc/zv1C9znK/1.png",
    "https://i.postimg.cc/JnX36DBR/2.png",
    "https://i.postimg.cc/66dLCZX0/4.png",])

    const [productInfo,setProductInfo] = useState([{}])

    console.log(productInfo)

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
                <>
                <h4 style = {{color : 'grey',fontWeight : '700',textAlign : 'center', marginBottom : '2%'}}>상품</h4>
                <button onClick={(() => postRefreshToken())}>토큰 재발급 버튼</button>
                {sort ? <div><button style = {{background : 'white', border: 'none'}} onClick = { () => { setSort(false)}}>인기순</button> <button style = {{background : 'white', border: 'none'}} >✔ 최신순</button> </div> : <div><button style = {{background : 'white', border: 'none'}}>✔ 인기순</button> <button style = {{background : 'white', border: 'none'}} onClick = { () => { setSort(true)}}>최신순</button> </div>}
                {sort ? <MainProduct navigate = {navigate} Endpoint = {Endpoint} product = {productInfo}></MainProduct> : <MainProduct navigate = {navigate} Endpoint = {Endpoint} product = {productDesc}></MainProduct>}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3%' }}></div>
                </>: 
                '등록된 상품이 존재하지 않습니다'}
                <div className = 'mainMoreButton' style = {{textAlign : 'center',marginTop : '-2%'}}>
                <Link to="/products"> 
                <button className="bg-transparent hover:bg-blue-500 text-black-700 font-semibold hover:text-white py-2 px-4 border1 border-black-500 hover:border-transparent rounded"
                onClick = {() => {}} >
                    더보기 
                </button></Link></div>
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
    return(
    <div className = 'row'>
    {
        props.product.slice(0,6).map(function(a, i){ 
        return(
            <div className="col-6 col-md-4 rounded-lg" key={i} style = {{ height : '300px'}}>     
    {   
        props.product[i].imgUrl ?
        (<img width = '100%' height = '70%' src = {props.Endpoint + props.product[i].imgUrl} style = {{marginRight : '5%'}} onClick={() => { props.navigate(`detail/${props.product[i].id}`) }}/>) : 
        (<p onClick={() => { props.navigate(`detail/${props.product[i].id}`) }} > 이미지 준비중 </p>)}
        <h4>{props.product[i].productName}</h4>
        </div>
        )})
    }
</div>
    )
}

function CarouselC(props)
{
    return(
    <Carousel autoplay speed>
        {props.carouselImage.map((image, index) => (
        <div key={index}>
            <h3 style={props.carouselStyle}>
            <img src={image} style={{ width: '100%', height: '100%' }} onClick = {() => { props.navigate(`detail/${props.product[index].id}`)}} />
            </h3>
        </div>
        ))}
    </Carousel>
    )
}

export default Main;