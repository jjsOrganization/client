import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Purchaser_ReformList = ({
  showMore,
  handleShowMore,
  fetchEstimateData,
  requestNumberEstimate,
  estimateAccept,
  estimateReject,
  openChat,
  estimateNumber,
  purchaserReformProducts
}) => {
  let navigate = useNavigate();

  

  return (
    <div className="purchaserReformedProduct">
      <h4>리폼목록</h4>
      <hr />
      {purchaserReformProducts.
      slice(0, showMore ? undefined : 2).
      map((product) => (
        <div key={product.id}>
          <h5>리폼 의뢰를 요청한 디자이너 : {product.designerName}</h5>
          <img
            src={`${product.requestImg[0].imgUrl}`}
            alt={product.name}
            onLoad={() => fetchEstimateData(product.id)}
          />
          <p>요청부위 : {product.requestPart}</p>
          <p>요청사항 : {product.requestInfo}</p>
          <p>가격 : {product.requestPrice}원</p>
          <p>상태 : {product.requestStatus}</p>
          <p>
            견적서 확인 : {product.state}{" "}
            <button className="OrderedBTN" onClick={() => fetchEstimateData(product.id)}>
              자세히
            </button>
            {requestNumberEstimate === product.id && (
              <>
                <button className="OrderedBTN" onClick={estimateAccept}>
                  수락
                </button>
                <button className="OrderedBTN" onClick={estimateReject}>
                  거절
                </button>
              </>
            )}
          </p>
          <p>
            1대1 채팅 : {product.id}{" "}
            <button className="OrderedBTN" onClick={() => openChat(product.id)}>
              시작
            </button>
          </p>
          <p>
            리폼 현황 :{" "}
            <button
              onClick={() => navigate(`/ConfigurationManagement/${estimateNumber}`)}
              className="OrderedBTN"
            >
              자세히
            </button>
          </p>
          <hr />
        </div>
      ))}
      {!showMore && (
        <button className="OrderedMoreBTN" onClick={handleShowMore}>
          더보기
        </button>
      )}
    </div>
  );
};

export default Purchaser_ReformList;