import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";

const StockBtn = styled.button`
  color: white;
  background: black;
`;

function StockList(props) {
  const navigate = useNavigate();

  const [myProduct, setMyProduct] = useState(["d", "d", "d"]);

  return (
    <div className="stockList">
      <TopBar />
      <div
        className="pagesTitle"
        style={{ marginTop: "5%", marginBottom: "5%", marginLeft: "7%" }}
      >
        <h3>재고목록</h3>
      </div>

      <div className="stockContainer">
        {myProduct.map(function (a, i) {
          return (
            <>
              <div>
                {" "}
                <hr></hr>
              </div>
              <div
                className="stockItemContainer"
                key={i}
                style={{ display: "flex" }}
              >
                <div className="image">
                  <img src={props.mainImage[i]} height="250px" />
                </div>

                <div
                  className="productInfoContainer"
                  style={{
                    width: "300px",
                    fontWeight: "700",
                    marginTop: "5%",
                    marginLeft: "10%",
                    display: "inline",
                  }}
                >
                  <div className="title">
                    <h3>{props.data[i].title}</h3>
                  </div>
                  <div
                    className=""
                    style={{ display: "flex", marginTop: "80px" }}
                  >
                    재고수 : {props.data[i].stock}
                  </div>
                  <div
                    className="StockBtn"
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginLeft: "",
                    }}
                  >
                    <StockBtn
                      onClick={() => {
                        navigate(`/stockupdater/${props.data[i].id}`);
                      }}
                    >
                      재고 수정
                    </StockBtn>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default StockList;
