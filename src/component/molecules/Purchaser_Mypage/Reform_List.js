import React, { useEffect } from "react";
import Button from "../../atoms/Button.js";
import { useNavigate } from "react-router-dom";
import store from "../../../store.js";

const ReformList = ({
  purchaserReformProducts = [],
  showMoreForReform,
  fetchEstimateData,
  handleShowMoreForReform,
  requestNumberEstimate,
  estimateAccept,
  estimateReject,
  openChat,
  estimateNumber
}) => {
  let navigate = useNavigate();
  const { requestN, setRequestN, setChatOpen } = store.usePurchaserMypageStore();

  return (
    <div>
      <div className="purchaserReformedProduct">
        <h4>리폼목록</h4>
        <hr />
        {purchaserReformProducts
          .slice(0, showMoreForReform ? undefined : 2)
          .map((product) => (
            <div key={product.id}>
              <h5>리폼 의뢰를 요청한 디자이너 : {product.designerName}</h5>
              <img
                src={`${product.requestImg[0].imgUrl}`}
                alt={product.name}
                onLoad={() => {
                  fetchEstimateData(product.id);
                }}
              />
              <p>요청부위 : {product.requestPart}</p>
              <p>요청사항 : {product.requestInfo}</p>
              <p>가격 : {product.requestPrice}원</p>
              <p>상태 : {product.requestStatus}</p>
              <p>
                견적서 확인 : {product.state}{" "}
                <button
                  className="OrderedBTN"
                  onClick={(event) => {
                    fetchEstimateData(requestN, event);
                  }}
                >
                  자세히
                </button>
                {requestNumberEstimate === requestN && (
                  <>
                    <button
                      className="OrderedBTN"
                      onClick={() => {
                        estimateAccept();
                      }}
                    >
                      수락
                    </button>

                    <button
                      className="OrderedBTN"
                      onClick={() => {
                        estimateReject();
                      }}
                    >
                      거절
                    </button>
                  </>
                )}
              </p>

              <p>
                1대1 채팅 : {" "}
                <button
                  className="OrderedBTN"
                  onClick={() => {
                    setRequestN(product.id);
                    setChatOpen(true);
                  }}
                >
                  시작
                </button>
              </p>

              <p>
                리폼 현황 :
                <button
                  onClick={() => {
                    navigate(`/ConfigurationManagement/${estimateNumber}`);
                  }}
                  className="OrderedBTN"
                >
                  자세히
                </button>
              </p>
              <hr />
            </div>
          ))}
        {!showMoreForReform && (
          <button className="OrderedMoreBTN" onClick={handleShowMoreForReform}>
            더보기
          </button>
        )}
      </div>
    </div>
  );
};

export default ReformList;