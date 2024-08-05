import {HeartOutlined, HeartFilled} from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axiosInstance from "../component/jwt.js";

function LikeComponent(props){
    let { productid } = useParams();

    const likeStateGet = async () => {
        try {
          const likeStateInfo = await axiosInstance.get(
          `/product/all/detail/${productid}/like-status`);
          props.setLikeState(likeStateInfo.data.data);
        } 
        catch (error) {
          console.log(error)
        }};
    
    useEffect(() => {
        if(localStorage.getItem('role') !== 'ROLE_PURCHASER'){
            props.setLikeState(false)
        }
        else{
            likeStateGet()
        }
    })

    return(
        <div>
            { props.likeState ? 
            <HeartFilled onClick = {() => { props.handleLike() }} style={{ color: 'red', fontSize: '40px', border : '2px solid black', marginTop : '4%'}} /> :
            <HeartOutlined onClick = {() => {props.handleLike() }} style={{ color: 'darkgrey', fontSize: '40px', border : '2px solid darkgrey', marginTop : '4%'}}/>}
        </div>
    )
}
export default LikeComponent;


