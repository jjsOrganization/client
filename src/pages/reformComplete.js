import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axiosInstance from "../component/jwt.js";
import TopBar from '../component/TopBar.js';

import {
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";

function ReformCompleted(){
    //형상관리 페이지에서 작업물로 이동하는걸로 해야할듯
    const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";
    const [reformData, setReformData] = useState();

    let {progressNumber} = useParams();
    const style = {
        height : '300px' , 
        width : '300px',
        margin : '2% 0 4% 1%'
    }

    const reformcompleted = async () => {
        try{
            const response = await axiosInstance.get(`/portfolio/reformOutput/detail/${progressNumber}`,
            )
            setReformData(response.data.data)
            console.log(response.data.data)
        }catch(error){
            console.error('에러',error)
        }
    }

    useEffect(() => {
        if (progressNumber) {
        reformcompleted()
        }
    },[progressNumber])

    console.log(progressNumber)

    if(!reformData){
        return(
            <div>데이터 로드중...</div>
        )
    }

    return(
        <>
            <TopBar />
            <div className = 'reformCompleted-Container'>
                <Card>
                    <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
                        의뢰 상품
                    </Typography>
                    <CardHeader className = 'mb-5'>
                            <img src = {Endpoint + reformData.productImgUrl} style = {style}></img>
                    </CardHeader>

                    <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
                        고객 요청
                    </Typography>
                    <CardHeader>
                        <img src = {reformData.reformRequestImgUrl} style = {style}></img>
                    </CardHeader>
                    
                    <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
                        디자이너 예상 
                    </Typography>
                    <CardHeader>
                        <img src = {reformData.estimateImgUrl} style = {style}></img>
                    </CardHeader>

                    <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
                        리폼 후 
                    </Typography>
                    <CardHeader>
                        <img src = {reformData.completeImgUrl} style = {style}></img>
                    </CardHeader>
                </Card>
            </div>
                
         </>
    )
}

export default ReformCompleted;