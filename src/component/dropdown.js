import React from 'react';
import {useEffect,useState} from 'react';
import styled from 'styled-components';

//강의 1시간부터 근데 새로운 탭 만드는 부분이라 이부분 넘겨도 되긴 함

let copyType;

const StyledButton = styled.button`
    display: flex;
    width: 150px;
    background: white;
    transition: background 0.3s; // 부드러운 트랜지션을 위한 설정

    &:hover {
        background: black;
        color: white; // 마우스를 올렸을 때 글자 색상 변경도 가능하면 추가
    }
`;

function Dropdown(props) {

const [isExpanded, setIsExpanded] = useState(false);
    
const articleBtnExpandHandler = () => {
    setIsExpanded(!isExpanded);
};

const articleTypeHandler = (type) => {
    copyType = ' : ' + type;
    props.setArticleType(copyType);
};
return(
    <div>
    {!isExpanded && (
        <button style = {{display : 'inline',width : '150px',backgroundColor : 'white',border : '1px solid'}}onClick={articleBtnExpandHandler}>
            {props.text} {props.articleType} 
        </button>
    )}
    {isExpanded && (
        <div onClick={articleBtnExpandHandler}>
            {props.articleTypeList.map((type, idx) => (
                <StyledButton
                key={type} onClick={() => {
                    articleTypeHandler(type);
                    setTimeout(() => {
                    props.cate(type)
                    }, 10000);}} >
                    {type}
                    {idx !== props.articleTypeList.length - 1 && <hr />}
                </StyledButton>
            ))}
        </div>
    )}

    
        

</div>
)
}




export default Dropdown;