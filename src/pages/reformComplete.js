import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import {Card,CardHeader,Typography,ooltip,} from "@material-tailwind/react";

function ReformCompleted() {
  
  const Endpoint = "https://jjs-stock-bucket.s3.ap-northeast-2.amazonaws.com/";
  const [reformData, setReformData] = useState();
  const [detailReformData, setDetailReformData] = useState();
  let { progressNumber } = useParams();

  const style = {
    height: "300px",
    width: "300px",
    margin: "2% 4% 4% 4%",
};

  const containerStyle = {
    display: 'flex',
    alignItems: 'center'
  };

  const reformcompleted = async () => {
    try {
      const response = await axiosInstance.get(
        `/portfolio/reformOutput/detail/${progressNumber}`,
      );
      setReformData(response.data.data);
    } catch (error) {
      console.error("에러", error);
    }
  };

  const reformInfo = async () => {
    try{
      const response = await axiosInstance.get(`/portfolio/reformOutput/upload/${progressNumber}`)
      setDetailReformData(response.data.data)
    }catch(error){
      console.log(error)
    }
  }

  const getAllReformInfo = async () => {
    return Promise.all([reformcompleted(),reformInfo()])
  }

  useEffect(() => {
    getAllReformInfo();
  }, []);

  console.log(reformData);
  console.log(detailReformData)

  if (!detailReformData) {
    return <div>데이터 로드중...</div>;
  }

  return (
    <>
      <TopBar />
      <div className="reformCompleted-Container">
        <Card>
          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            <h1>UI추후 수정 예정 
            어캐 만들어야할지 모르겠음...</h1>
          </Typography>
          <CardHeader className="mb-5">
        <div style={containerStyle}> 
            <img src={Endpoint + reformData.productImgUrl} style={style} alt="Product" />
            <div>
                <h3>상품명: {detailReformData.productName}</h3>
            </div>
        </div>
    </CardHeader>

          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            고객 요청 
          </Typography>
          <CardHeader>
            <div style = {{containerStyle}}> 
              <img src={reformData.reformRequestImgUrl} style={style}></img>
              <div style = {{display : 'inline'}}>요청사항 : {detailReformData.reformRequestInfo}</div>
            </div>
          </CardHeader>

          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            예상 결과물
          </Typography>
          <CardHeader>
            <div style = {{containerStyle}}>
              <img src={reformData.estimateImgUrl} style={style}></img>
              <div style = {{display : 'inline'}}> 리폼 가격 : {detailReformData.price}</div>
              <div style = {{display : 'inline'}}> 견적서 내용 : {detailReformData.estimateInfo}</div>
            </div>
          </CardHeader>

          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            리폼 후
          </Typography>
          <CardHeader>
            <img src={reformData.completeImgUrl} style={style}></img>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default ReformCompleted;
