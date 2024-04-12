import React, { useState, useEffect } from "react";
import axiosInstance from "./jwt.js";

function DesignerWriteEstimate() {
  const [requestNumber, setRequestNumber] = useState("");
  const [estimateInfo, setEstimateInfo] = useState("");
  const [estimateImg, setEstimateImg] = useState(null);
  const [reformPrice, setReformPrice] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestNumberParam = params.get("requestNumber");
    if (requestNumberParam) {
      setRequestNumber(requestNumberParam);
    }
  }, []);

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
    console.log(requestNumber);
    console.log(estimateInfo);
    console.log(estimateImg);
    console.log(reformPrice);
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

  return (
    <div>
      <h2>견적서 작성하기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>견적서 정보 : </label>
          <textarea
            cols="150"
            rows="50"
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DesignerWriteEstimate;
