import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import {Card,CardHeader,Typography,ooltip,} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';

function ReformCompleted() {
  const navigate = useNavigate();
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
  alignItems: 'center', // 세로로 가운데 정렬
  flexDirection: 'row',
  padding: '20px'
};

const textStyle = {
  display: 'flex',
  flexDirection: 'column', // 텍스트를 세로로 정렬
  marginLeft: '10px',
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
      alert("로그인이 되지 않았거나 오류가 발생했습니다. 다시 시도해주세요.");
      navigate(`/`);
      console.log(error)
    }
  }

  const getAllReformInfo = async () => {
    return Promise.all([reformcompleted(),reformInfo()])
  }

  useEffect(() => {
    getAllReformInfo();
  }, []);

  if (!detailReformData) {
    return <div>데이터 로드중...</div>;
  }

  return (
    <>
      <TopBar />
      <div className="reformCompleted-Container">
        <Card>
          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            리폼 전 상품 이미지
          </Typography>
          <CardHeader className="mb-5">
        <div style={containerStyle}> 
            <div className='imageWrapper' style={{ display: 'flex' }}>
            <img src={Endpoint + reformData.productImgUrl} style={style} alt="Product" />
            </div>
        <div>
                <div style = {textStyle}>
                <div style = {{display: 'inline'}}>상품명: {detailReformData.productName}</div>
                <div style = {{display: 'inline'}}>디자이너: {detailReformData.designerName}</div>
                </div>
            </div>
        </div>
    </CardHeader>

          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            고객 요청 
          </Typography>
          <CardHeader>
            <div style = {containerStyle}> 
              <div className='imageWrapper' style={{ display: 'flex' }}>
                  <img src={reformData.reformRequestImgUrl} style={{width: '300px', height: '300px'}} />
              </div>
              
              <div style = {textStyle}>
                <div style={{ display: 'inline' }}>요청사항 : {detailReformData.reformRequestInfo}</div>
              </div>
            </div>
          </CardHeader>

          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            예상 결과물
          </Typography>
          <CardHeader>
            <div style={containerStyle}>
              <div className='imageWrapper' style={{ display: 'flex',  }}>
                <img src={reformData.estimateImgUrl} style={style} />
              </div>
              <div style={textStyle}>
                <div style={{ display: 'inline' }}>리폼 가격 : {detailReformData.price}</div>
                <div style={{ display: 'inline' }}>견적서 내용 : {detailReformData.estimateInfo}</div>
              </div>
            </div>
          </CardHeader>

          <Typography variant="h6" color="blue-gray" className="mt-2 ml-8">
            리폼된 상품 이미지
          </Typography>
          <CardHeader>
            <div style={containerStyle}>
              <div className='imageWrapper' style={{ display: 'flex' }}>
              <img src={reformData.completeImgUrl} style={style}></img>
              </div>

              <div style = {textStyle}>
                <div style={{ display: 'inline' }}>리폼 내용: {reformData.explanation}</div>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </>
  );
}

export default ReformCompleted;
