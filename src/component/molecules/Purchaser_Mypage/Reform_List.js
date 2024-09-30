import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import store from "../../../store.js";
import { getAxios } from "../../Axios.js";

const ReformList = ({
  purchaserReformProducts = [],
  showMoreForReform,
  fetchEstimateData,
  handleShowMoreForReform,
  requestNumberEstimate,
  estimateAccept,
  estimateReject,
}) => {
  const { accessToken } = store.useTokenStore();
  const { setRequestN, setChatOpen } = store.usePurchaserMypageStore();
  let navigate = useNavigate();

  const [clickedProducts, setClickedProducts] = useState({});
  const [productIsNull, setProductIsNull] = useState({});
  const [listData, setListData] = useState({});
  const [estimateNumbers, setEstimateNumbers] = useState({});

  const handleDetailClick = async (productId, event) => {
    const response = await fetchEstimateData(productId, event);
    const isNullResponse = response ? response.data === null : true;

    setClickedProducts((prevState) => ({
      ...prevState,
      [productId]: true,
    }));

    setProductIsNull((prevState) => ({
      ...prevState,
      [productId]: isNullResponse,
    }));
  };

  const listForRequest = async (requestNumber) => {
    try {
      const response = await getAxios(
        `/estimate/purchaser/estimateForm/${requestNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const status = response.data.data.estimateStatus;
      return status;
    } catch (error) {
      return null;
    }
  };

  const listForEstimate = async (requestNumber) => {
    try {
      const response = await getAxios(
        `/estimate/purchaser/estimateForm/${requestNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const estimateNumber = response.data.data.estimateNumber;
      return estimateNumber;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const fetchListData = async () => {
      const newListData = {};
      const newEstimateNumbers = {};
  
      for (let product of purchaserReformProducts) {
        const status = await listForRequest(product.id);
        const estimateNumber = await listForEstimate(product.id);
  
        newListData[product.id] = status;
        newEstimateNumbers[product.id] = estimateNumber;
      }
  
      setListData(newListData);
      setEstimateNumbers(newEstimateNumbers);
    };
  
    if (purchaserReformProducts.length > 0) {
      fetchListData();
    }
  }, [purchaserReformProducts]);

  return (
    <div>
      <div className="purchaserReformedProduct">
        <h4>리폼목록</h4>
        <hr />
        {purchaserReformProducts
          .slice(0, showMoreForReform ? undefined : 2)
          .map((product) => {
            const productStatus = listData[product.id];
            const number = listForEstimate(product.id);
            return (
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
                <p>
                  견적서 확인 :
                  {productStatus === "REQUEST_WAITING" && (
                    <>
                      <button
                        className="OrderedBTN"
                        onClick={(event) =>
                          handleDetailClick(product.id, event)
                        }
                      >
                        자세히
                      </button>
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
                  <div>
                  {productStatus === "REQUEST_ACCEPTED" && (
                    <>
                      <div>
                        <button
                          className="OrderedBTN"
                          onClick={(event) =>
                            handleDetailClick(product.id, event)
                          }
                        >
                          자세히
                        </button>
                      </div>
                    </>
                  )}
                  </div>
                  {productStatus === null && (
                    <p>디자이너가 견적서를 작성중입니다.</p>
                  )}
                </p>
                <div>
                  {productStatus === "REQUEST_ACCEPTED" && (
                    <>
                      <div>
                        <p>
                          1대1 채팅 :{" "}
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
                      </div>
                    </>
                  )}
                  </div>

                <p>
                  리폼 현황 :
                  <button
                    onClick={() => {
                      navigate(`/ConfigurationManagement/${estimateNumbers[product.id]}`);
                    }}
                    className="OrderedBTN"
                  >
                    자세히
                  </button>
                </p>
                <hr />
              </div>
            );
          })}
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
