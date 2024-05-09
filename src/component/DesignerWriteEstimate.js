import React, { useState, useEffect } from "react";
import axiosInstance from "./jwt.js";
import { useParams } from "react-router-dom";

function DesignerWriteEstimate() {
  const [estimateInfo, setEstimateInfo] = useState("");
  const [estimateImg, setEstimateImg] = useState(null);
  const [reformPrice, setReformPrice] = useState("");
  const [estimateNumber, setEstimateNumber] = useState(null);
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
    setEstimateImg(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("estimateInfo", estimateInfo);
      formData.append("estimateImg", estimateImg);
      formData.append("reformPrice", reformPrice);
      const response = await axiosInstance.post(
        `/estimate/designer/estimateForm/${requestNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setEstimateNumber(response.data.estimateNumber);
      window.alert("견적서 작성이 완료되었습니다. 계속 수정이 가능합니다.");
    } catch (error) {
      window.alert("오류로 견적서 작성이 되지 않았습니다.");
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
      setEstimateInfo(data.estimateInfo || "");
      setEstimateImg(data.estimateImg);
      setReformPrice(data.price || "");
      setEstimateNumber(data.estimateNumber);
    } catch (error) {
      window.alert("오류로 견적서 내용을 불러오지 못했습니다.");
    }
  };

  useEffect(() => {
    if (requestNumber) {
      fetchEstimateData();
    }
  }, [requestNumber]);

  const handleReSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("estimateInfo", estimateInfo);
      formData.append("estimateImg", estimateImg);
      formData.append("reformPrice", reformPrice);
      await axiosInstance.put(
        `/estimate/designer/estimateForm/${estimateNumber}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      window.alert("견적서 수정이 완료되었습니다. 계속 수정이 가능합니다.");
    } catch (error) {
      window.alert("오류로 견적서 수정이 되지 않았습니다. 다시 시도해주세요.");
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
        <p>수정시에도 사진을 꼭 넣어주세요.</p>
        <input
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          // value={estimateImg}
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
        {estimateInfo !== "" && estimateNumber ? (
          <button
            onClick={handleReSubmit}
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
        ) : (
          <button
            onClick={handleSubmit}
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
        )}
      </div>
    </div>
  );
}

export default DesignerWriteEstimate;
