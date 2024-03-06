import React from 'react';
import {useEffect,useState,} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Kakao from '../component/kakaoMap';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal"; 
import axios from 'axios'
import "../js/TopBar.js";
import TopBar from "../js/TopBar.js";

const BtnStyle = styled.button`
    color: white;
    background: black;
`

function MyPages(){

    const customStyles = {
        overlay: {
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const Endpoint = 'https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/'
    const [openPostcode, setOpenPostcode] = useState(false);
    const [address, setAddress] = useState('');
    const StockNavigate = useNavigate();
    const productupdateNavigate = useNavigate();
    const [registerData,setRegisterData] = useState([]);
    const [sellerData, setSellerData] = useState([]);

    const mapHandler = {
        clickButton() {
            setOpenPostcode(current => !current);
        },

        searchAddress(data) {
            setAddress(data.address)
            setOpenPostcode(false);
        }

    }

    const handleInputChange = (e) => {
        setAddress(e.target.value);
    };

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        'X-CSRF-TOKEN': localStorage.getItem('csrfToken')
        }
    });

    const productDeleteHandler = async (i) => {
        try{
            const deleteProduct = await axiosInstance.delete(`/product/seller/register/${registerData[i].id}`,
            {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'X-CSRF-TOKEN': localStorage.getItem('csrfToken')
            }})
            console.log('상품삭제성공')
            alert('상품 삭제 완료')
            window.location.replace(`/mypage2`);
        }   
        catch(error){
            console.log('상품삭제실패',error)
        }
        }

        //판매자가 등록한 상품 조회
        useEffect(() => {
            const fetchRegisterData = async () => {
                try {        
                    const registerResponse = await axiosInstance.get('/product/seller/register', {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                        }
                    });
                    setRegisterData(registerResponse.data);
                } catch(error) {
                    console.log('데이터 로드 실패', error);
                }
            };
            fetchRegisterData();
        }, []);

        //판매자 정보 조회
        useEffect(() => {
            const fetchSellerData = async () => {
                try {        
                    const sellerResponse = await axiosInstance.get("/seller/info", {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization' : `Bearer ${localStorage.getItem('accessToken')}`,
                        }
                    });
                    setSellerData(sellerResponse.data);
                } catch(error) {
                    console.log('데이터 로드 실패', error);
                }
            };
            fetchSellerData();
        }, []);

    return(
<div className = 'mypageContainer'>
    <TopBar />
    <h3 >마이페이지</h3>
    <div className='mypageProductList' style={{ display: 'flex', marginBottom: '-28px' }}>
    <p style={{ display: 'inline' }}>상품목록</p>
    <p style={{ marginLeft: 'auto' }} onClick = {() => {
        productupdateNavigate('/productupdate')
    }}>상품등록</p>
    </div>
    <div>
        <MypageProductList Endpoint = {Endpoint} productDeleteHandler = {productDeleteHandler} registerData = {registerData} navigate = {StockNavigate}/>
    </div>
    <p style = {{ marginBottom : '-12px',display : 'flex'}}>매장정보</p><hr></hr>

    <div className = 'mypageShopContainer' style = {{marginTop : '-4px',display : 'flex'}}>
        <Kakao/>
        <div className = 'shopAddress' onClick = {() => { mapHandler.clickButton()}} style = {{display : 'flex' }}>
            <p style = {{display : 'flex',marginLeft: '25px'}}>매장위치 :</p>
            <input type = 'text' value = {address} readOnly placeholder=" 우편번호"  onChange={handleInputChange} style = {{marginLeft : '10px',height : '25px'}}></input>
        </div>
        <Modal isOpen={openPostcode} ariaHideApp={false} style={customStyles} >
            <DaumPostcode onComplete={mapHandler.searchAddress} height="100%" /> <label onClick = {() => { mapHandler.clickButton()}} style = {{position : 'absolute', bottom : '0', right : '5%'}}>나가기 ✖</label>
        </Modal>
    </div>
</div>

    )
}


function MypageProductList(props){
    return(
        <div >
            {
                props.registerData.map(function(image,i){
                    return(
                        <>
                        <hr style= {{marginBottom : '10px'}}></hr>
                        <div className = 'stockItemContainer' key = {i} style = {{display : 'flex', marginBottom : '10px'}}>
            <div className = 'image' style= {{marginBottom : '-16px'}}>
            <img src = {props.Endpoint + props.registerData[i].imgUrl} width = '100px' height = '100px'/>
            </div>
                
            <div className = 'productInfoContainer' style = {{width : '400px',fontWeight : '700',marginLeft : '10%',display : 'inline'}}>
            <div className = 'title'>
                <h3>{props.registerData[i].productName}</h3>
            </div>
            <div className='' style = {{display : 'flex'}}>
                재고수 : {props.registerData[i].productStock}
            </div>
            <div className = 'BtnStyle' style = {{display : 'flex',justifyContent : 'flex-end'}}>
                <BtnStyle style = {{marginRight  :'5%'}}onClick = {() =>{
                    props.navigate(`/stockupdater/${props.registerData[i].id}`);
                }} >상품 수정</BtnStyle>

                <BtnStyle onClick = {() =>{
                    props.productDeleteHandler(i);
                }} >상품 삭제</BtnStyle>
            </div>
            </div>
            </div>
            </>
                    )
                })
            }
        </div>
    )
}






export default MyPages;