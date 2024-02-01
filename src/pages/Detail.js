import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {useEffect,useState} from 'react';
import Dropdown from '../component/dropdown';
import copyType from '../component/dropdown';

//useEffect 사용 관련내용 리액트3강의 34분 부터

let YellowBtn = styled.button`
    background : yellow;
    color : black
    padding : 10px
`

let BasicBtn = styled.button`
    padding : 1%;
    background : black;
    color : white;
    width : 30%;
`



function Detail(props){
    const [myArray, setMyArray] = useState([])
    
    let [sale, setSale] = useState(0.25);
    let {id} = useParams();
    let salePrice = props.shoes[id].price * (1 - sale);
    let [total, setTotal] = useState(0);
    const [dropdownVisibility, setDropdownVisibility] = React.useState(false);

    //Dropdown 관련 변수
    const SizeList = ['S', 'M','L','XL'];
    const ColorList = ['검정', '아이보리','그레이','챠콜'];
    const size = ('Size');
    const color = ('Color');
    const test = total * salePrice;
    const [choiceSize, setChoiceSize] = useState(null);
    const [choiceColor,setChoiceColor] = useState(null);

    const addValue = () => {
        setMyArray(prevArray => [
            ...prevArray,
            { size: choiceSize, color: choiceColor },
        ]);
        setChoiceColor(null);
        setChoiceSize(null);
    };

    useEffect(() => {
        if (choiceSize  && choiceColor) {
            addValue();
            setTotal(total+1); 
        }
        
    }, [choiceSize, choiceColor]);

const handleUpdateAmount = () => {
    // 입력값 업데이트 로직
};

    return(
<div className="Detail" >
    <div className="image" style = {{display : 'flex', marginBottom : '3%', width : '100%', height : '100%'}}>
        <img src = "https://i.postimg.cc/zfrVFgNL/1.png" width="300px" height= '300px' />
        <div className = 'productinfo' style = {{display : 'inline',position : 'relative',flexDirection : 'column',flexGrow: 1, marginLeft : '2%',}}>
        <h4 className="title">{props.shoes[id].title}</h4>
        <p>{props.shoes[id].content}</p>
        <p style={{ fontWeight: 'bold', textDecoration: 'line-through', color : 'darkgray' }}>{props.shoes[id].price.toLocaleString()}</p>
        <p style={{ fontWeight: '800', color : 'red'}}>{sale * 100}%</p>
        <p style={{ fontWeight: 'bold'}}>할인가 : {salePrice.toLocaleString()}</p>
        <div className = 'btn' style={{display: 'flex',justifyContent: 'space-between',position : 'absolute', bottom : '0', width : '100%'}}>
        <BasicBtn>구매하기</BasicBtn>
        <BasicBtn>의뢰하기</BasicBtn>
        <BasicBtn>장바구니</BasicBtn>
        </div>
        </div>
        
    </div>
    
    <div className = 'productField'>
        <p><h1>대충 상품 정보 적혀있는 칸 </h1></p>
    </div>

    <div className = 'buy-info' style = {{display : 'flex'}}>
    <div className = 'dropdown' style = {{display : 'flex', marginTop : '3%'}}>
    <Dropdown text = {size} setArticleType = {setChoiceSize} articleType = {choiceSize} articleTypeList ={SizeList} />
    <Dropdown text = {color} setArticleType = {setChoiceColor} articleType = {choiceColor} articleTypeList = {ColorList}/>
    </div>
    <div className = 'buy-info' style = {{marginLeft : '7%'}}>
        <h3>제품명 : {props.shoes[id].title}</h3>
        <p style = {{marginBottom : '2%'}}>결제 예정 금액 : {test.toLocaleString()} </p>
        <p>수량 : {total}</p>
        <div classNale = 'selectOpt'>
    {
        myArray.map(function(choice,index){
            return(
                <div className='user-choice' style = {{width : '180px', marginBottom : '10px'}}>
                    {choice.size+choice.color} <button className = 'choice-cancel'>✖</button> 
                </div>
        )})}
        </div>
    </div>
    </div>
</div>
    )
}



/*<div className = 'dropdown' style = {{display : 'flex'}}>
<Dropdown setArticleType = {setchoiceSize} articleType = {choiceSize} articleTypeList = {ColorList}/>
<Dropdown setArticleType = {setchoiceColor} articleType = {choiceColor} articleTypeList = {SizeList}/>
</div>*/


export default Detail;


//강의에서 얘기하는 id값에 따른 상품을 보여주는 방식 아마
//먼저 정렬기능을 갖춘 버튼을 만든 후 해당 기능을 통해 배열이 정렬이 될 것이고
//정렬된 배열의 0번째 인덱스 정보가 기존 3번째 인덱스 정보가 될 수 있으니
//정렬된 상품의 key값을 기준으로 상품의 정보를 표시
//나중에 볼 떄 잘 이해 안가면 일단 정렬기능부터 만들기