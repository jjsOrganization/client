import React, { useState, useEffect } from "react";
import axiosInstance from "./jwt.js";
import { useParams } from "react-router-dom";

function DesignerWriteEstimate() {
  const [estimateInfo, setEstimateInfo] = useState("");
  const [estimateImg, setEstimateImg] = useState(null);
  const [reformPrice, setReformPrice] = useState("");
  const [estimateNumber, setEstimateNumber] = useState("");
  const { requestNumber } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "estimateInfo") {
      setEstimateInfo(value);
    } else if (name === "reformPrice") {
      setReformPrice(value);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("Uploaded file:", file);
    setEstimateImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("estimateInfo", estimateInfo);
      formData.append("estimateImg", estimateImg);
      formData.append("reformPrice", reformPrice);
      console.log(formData);
      const request = await axiosInstance.post(
        `/estimate/designer/estimateForm/${requestNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error writing estimate:", error);
    }
  };

  const fetchEstimateData = async () => {
    try {
      const response = await axiosInstance.get(
        `/estimate/designer/estimateForm/${requestNumber}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = response.data.data;
      console.log(data);
      setEstimateInfo(data.estimateInfo);
      setEstimateImg(data.estimateImg);
      setReformPrice(data.price);
      setEstimateNumber(data.estimateNumber);
    } catch (error) {}
  };

  useEffect(() => {
    fetchEstimateData();
  }, []);

  const handleReSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("estimateInfo", estimateInfo);
      formData.append("estimateImg", estimateImg);
      formData.append("reformPrice", reformPrice);
      console.log(formData);
      const request = await axiosInstance.put(
        `/estimate/designer/estimateForm/${estimateNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error writing estimate:", error);
    }
  };

  return (
    <div>
      <h2>견적서 작성하기</h2>
      <div>
        <label>견적서 정보 : </label>
        <textarea
          cols="75"
          rows="24"
          type="text"
          name="estimateInfo"
          value={estimateInfo}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>견적서 사진 : </label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageUpload}
        />
      </div>
      <div>
        <label>가격 : </label>
        <input
          type="text"
          name="reformPrice"
          value={reformPrice}
          onChange={handleChange}
        />
      </div>
      <div>
        {estimateInfo === null ? (
          <button
            onClick={() => {
              handleSubmit();
            }}
            style={{
              backgroundColor: "darkblue",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            견적서 작성
          </button>
        ) : (
          <button
            onClick={() => {
              handleReSubmit();
            }}
            style={{
              backgroundColor: "darkblue",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            견적서 수정
          </button>
        )}
      </div>
    </div>
  );
}

export default DesignerWriteEstimate;
