import React from 'react';
import {useEffect,useState} from 'react';
import styled from 'styled-components';
import StockList from './stockList';

let RegisterBtn = styled.button`
    color: white;
    background: black;
`




function StockUpdater(){

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
    
    const [titleValue, setTitleValue] = useState();
    const [contentValue, setContentValue] = useState();
    const [priceValue, setPriceValue] = useState();
    const [amountValue, setAmountValue] = useState();
    
    
    const savecontent = (event) => {
        setContentValue(event.target.value);
    }
    
    const saveAmount = (event) => {
        setAmountValue(event.target.value);
    }
    
    const savePrice = (event) => {
        setPriceValue(event.target.value);
    }
    
    const saveTitle = (event) => {
        setTitleValue(event.target.value);
    }
    
    const register = () => {
        setTest(prevArray => [
            ...prevArray,
            {title : titleValue, content : contentValue ,price : priceValue}
        ])
        setTitleValue('');
        setContentValue('');
        setPriceValue('');
    }
    
    
    const [productRegister, setProductRegister] = useState([])

    return(
        <div>
        <div style = {{marginTop : '5%', marginLeft : '7%'}}ClassName = 'title'>
            <h3>상품수정</h3>
        </div>
        <div className = 'image' style = {{display : 'flex', justifyContent : 'center'}}>
    <img src = 'https://i.postimg.cc/zfrVFgNL/1.png'></img>
        </div>

    <div className ='container' >
        <div className = 'image-update' style = {{justifyItems : 'end',display: 'grid',marginBottom : '30px'}}>
        <input type="file" />
        </div>
        <div className = 'title'>
        <p style = {{fontWeight : '700',margin : '0'}}> {test[0].title}상품 제목</p>
        <input value = {titleValue} type="text" onChange = {saveTitle} style = {{width : '100%',marginBottom : '30px'}}/>
        </div>
        <div className = 'content'>
        <p style = {{fontWeight : '700',margin : '0'}}>상품 정보</p>
        <input value = {contentValue} type="text" onChange = {savecontent} style = {{width : '100%',marginBottom : '30px'}}/>
        </div>
        <div className = 'price'>
        <p style = {{fontWeight : '700',margin : '0'}}>상품 가격</p>
        <input value = {priceValue} type="text" onChange = {savePrice} style = {{width : '100%',marginBottom : '30px'}}/>
        </div>
        <div className = 'amount'>
        <p style = {{fontWeight : '700',margin : '0'}}>재고수</p>
        <input value = {amountValue} type="text" onChange = {saveAmount} style = {{width : '100%',marginBottom : '30px'}}/>
        </div>
        <div className = 'register' style = {{textAlign : 'right'}}>
        <RegisterBtn onClick = {() => {
            register()
        }} >상품수정</RegisterBtn>
        </div>
    </div>
    </div>
    )
}

export default StockUpdater;