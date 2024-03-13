import React from "react";
import Select from "react-select";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import "./TopBar.js";
import TopBar from "./TopBar.js";
import { useLocation } from "react-router-dom";

let RegisterBtn = styled.button`
  color: white;
  background: black;
`;

function Reform() {
  const [requestPart, setRequestPart] = useState("");
  const [requestInfo, setRequestInfo] = useState("");
  const [requestPrice, setRequestPrice] = useState("");
  const [designers, setDesigners] = useState([]);

  const [thumbnailImage, setThumbnailImage] = useState("");
  const [thumbnailImageFile, setThumbnailImageFile] = useState("");

  const [selectedDesigner, setSelectedDesigner] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const productId = searchParams.get("productId");

  const saveRequestPart = (event) => {
    setRequestPart(event.target.value);
  };

  const saveRequestInfo = (event) => {
    setRequestInfo(event.target.value);
  };

  const saveRequestPrice = (event) => {
    setRequestPrice(event.target.value);
  };

  const encodeImageFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const encodeImageUrl = encodeURIComponent(reader.result);
      setThumbnailImage(encodeImageUrl);
      setThumbnailImageFile(file);
    };
  };

  const registerHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("requestPart", requestPart);
      formData.append("requestInfo", requestInfo);
      formData.append("requestImg", thumbnailImage);
      formData.append("requestPrice", requestPrice);
      formData.append("designerEmail", selectedDesigner);

      const response = await axios.post(`/reform-request/purchaser/creation/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-CSRF-TOKEN": localStorage.getItem("csrfToken"),
        },
      });

      console.log("리폼요청 성공:", response.data);
      alert("리폼요청이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("리폼요청 실패:", error);
      alert("리폼요청 등록에 실패했습니다.");
    }
  };

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await axios.get("/portfolio/all", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = response.data.data;
        console.log(data);
        setDesigners(data);
      } catch (error) {
        console.error("디자이너 조회 실패:", error);
        alert("디자이너 조회 실패함.");
      }
    };
    fetchDesigners();
  }, []);

  const handleDesignerSelect = (selectedDesigner) => {
    console.log("선택한 디자이너:", selectedDesigner);
    setSelectedDesigner(selectedDesigner);
  };

  const designerOptions = designers.map((designer) => ({
    value: designer.designerEmail,
    label: designer.designerName,
  }));

  return (
    <div>
      <TopBar />
      <div style={{ marginLeft: "20%", marginRight: "20%" }}>
        <div style={{ marginTop: "5%", marginLeft: "7%" }} ClassName="title">
          <h3>리폼요청</h3>
        </div>
        <div
          className="image"
          style={{
            height: "300px",
            border: "1px solid black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={thumbnailImage}
            height="90%"
            style={{ marginTop: "1.8%" }}
          ></img>
        </div>

        <div className="productRegisterContainer">
          <div
            className="productRegisterImageUpdate"
            style={{
              justifyItems: "end",
              display: "grid",
              marginBottom: "30px",
            }}
          >
            <label
              htmlFor="fileInput"
              className="inputLabel"
              style={{
                padding: "10px",
                margin: "5px 0 20px 0",
                fontWeight: "bold",
                color: "red",
                cursor: "pointer",
                display: "inline-block",
                border: "1px solid red",
              }}
            >
              사진 업로드
            </label>

            <input
              id="fileInput"
              type="file"
              multiple
              onChange={(event) => encodeImageFile(event)}
              style={{ display: "none" }}
            />
          </div>

          <div className="designer">
            <p style={{ fontWeight: "700", margin: "0" }}>디자이너</p>
            {/* 검색 창 */}
            <Select options={designerOptions} placeholder="디자이너 검색" onChange={handleDesignerSelect} />
          </div>

          <div className="requestPart">
            <p style={{ fontWeight: "700", margin: "0" }}>리폼부위</p>
            <input
              value={requestPart}
              type="text"
              onChange={saveRequestPart}
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </div>

          <div className="requestInfo">
            <p style={{ fontWeight: "700", margin: "0" }}>리폼요청 사항</p>
            <input
              value={requestInfo}
              type="text"
              onChange={saveRequestInfo}
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </div>

          <div className="requestPrice">
            <p style={{ fontWeight: "700", margin: "0" }}>리폼 가격</p>
            <input
              value={requestPrice}
              type="text"
              onChange={saveRequestPrice}
              style={{ width: "100%", marginBottom: "30px" }}
            />
          </div>

          <div className="register" style={{ textAlign: "right" }}>
            <RegisterBtn
              onClick={() => {
                registerHandler();
              }}
            >
              리폼요청
            </RegisterBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reform;
