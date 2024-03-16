import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useEffect, useState } from "react";

function LikeComponent(props){
    

    return(
        <div>
            { props.likeState ? 
            <HeartFilled onClick = {() => { props.setLikeState(prevState => !prevState); props.handleLike() }} style={{ color: 'red', fontSize: '40px', border : '2px solid black', marginTop : '4%'}} /> :
            <HeartOutlined onClick = {() => {props.setLikeState(prevState => !prevState);props.handleLike() }} style={{ color: 'darkgrey', fontSize: '40px', border : '2px solid darkgrey', marginTop : '4%'}}/>}
        </div>
    )
}
export default LikeComponent;


