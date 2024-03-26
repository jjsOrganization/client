import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TopBar from "../component/TopBar.js";

const ProgressContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`;

const ProgressStep = styled.img`
width: 500px;
height: auto;
margin: 20px;
`;

const H5 = styled.h5`
margin-left: 50px;
`;

function DesignerReformState() {
let navigate = useNavigate();

return (
<div>
    <TopBar/>
    <h4>리폼 현황</h4>
    <ProgressContainer>
    <h5 className="reformState">1차 리폼</h5>
    <ProgressStep src="https://i.postimg.cc/jjqBtNk2/reformstate.png" alt="Step 1" />
    <h5>2차 리폼</h5>
    <ProgressStep src="https://i.postimg.cc/jjqBtNk2/reformstate.png" alt="Step 2" />
    <h5>3차 리폼</h5>
    <ProgressStep src="https://i.postimg.cc/jjqBtNk2/reformstate.png" alt="Step 3" />
    <h5>4차 리폼</h5>
    <ProgressStep src="https://i.postimg.cc/jjqBtNk2/reformstate.png" alt="Step 4" />
    </ProgressContainer>
</div>
);
}

export default DesignerReformState;