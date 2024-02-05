import React from 'react';
import {useEffect,useState,} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Kakao from '../component/kakaoMap';
import DaumPostcode from "react-daum-postcode";
import Modal from "react-modal"; 

const StockBtn = styled.button`
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

    const [openPostcode, setOpenPostcode] = useState(false);
    const [address, setAddress] = useState('');


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

    const StockNavigate = useNavigate();
    const productupdateNavigate = useNavigate();

    const [test, setTest] = useState([
        {
        id : 0,
        title : "White and Black",
        content : "Born in France",
        price : 120000,
        },
    
        {
        id : 1,
        title : "Red Knit",
        content : "Born in Seoul",
        price : 110000,
        },
    
        {
        id : 2,
        title : "Grey Yordan",
        content : "Born in the States",
        price : 130000,
        }
    ])

    const [mypageMainImage, setMypageMainImage] = useState([
        'https://i.postimg.cc/zfrVFgNL/1.png',
        'https://i.postimg.cc/zv6fbLpG/2.png',
        'https://i.postimg.cc/6QfTjp6M/3.png'
    ])


    return(
<div className = 'mypageContainer'>
    <h3 >마이페이지</h3>
    <div className='mypageProductList' style={{ display: 'flex', marginBottom: '-28px' }}>
    <p style={{ display: 'inline' }}>상품목록</p>
    <p style={{ marginLeft: 'auto' }} onClick = {() => {
        productupdateNavigate('/productupdate')
    }}>상품등록</p>
    </div>
    <div>
        <MypageProductList test = {test} navigate = {StockNavigate} mypageMainImage = {mypageMainImage}/>
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
                props.mypageMainImage.map(function(image,i){
                    return(
                        <>
                        <hr style= {{marginBottom : '10px'}}></hr>
                        <div className = 'stockItemContainer' key = {i} style = {{display : 'flex', marginBottom : '10px'}}>
            <div className = 'image' style= {{marginBottom : '-16px'}}>
            <img src = {props.mypageMainImage[i]} height = '100px'/>
            </div>
                
            <div className = 'productInfoContainer' style = {{width : '300px',fontWeight : '700',marginLeft : '10%',display : 'inline'}}>
            <div className = 'title'>
                <h3>{props.test[i].title}</h3>
            </div>
            <div className='' style = {{display : 'flex'}}>
                재고수 : {props.test[i].id}
            </div>
            <div className = 'StockBtn' style = {{display : 'flex',justifyContent : 'flex-end'}}>
                <StockBtn onClick = {() =>{
                    props.navigate(`/stockupdater/:id`);
                }} >상품 수정</StockBtn>
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