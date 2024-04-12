import React, { useState } from "react";
import axiosInstance from "./jwt.js";

function DesignerWriteEstimate({ requestNumber }) {
  const [estimateInfo, setEstimateInfo] = useState("");
  const [estimateImg, setEstimateImg] = useState(null);
  const [price, setPrice] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "estimateInfo") {
      setEstimateInfo(value);
    } else if (name === "price") {
      setPrice(value);
    }
  };

  const handleImageUpload = e => {
    const file = e.target.files[0];
    setEstimateImg(file);
  };

  const handleSubmit = async e => {
   console.log(estimateImg);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("estimateInfo", estimateInfo);
      formData.append("estimateImg", estimateImg);
      formData.append("price", price);

      const request = await axiosInstance.post(
        `/estimate/designer/estimateForm/${requestNumber}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
    } catch (error) {
      console.error("Error writing estimate:", error);
    }
  };

  return (
    <div>
      <h2>Write Estimate</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Estimate Info:</label>
          <input
            type="text"
            name="estimateInfo"
            value={estimateInfo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Estimate Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DesignerWriteEstimate;