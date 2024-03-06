import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

function DesignerSelect() {
  const [designersList, setDesignersList] = useState(null);

  useEffect(() => {
    const fetchDesigners = async () => {
      try {
        const response = await axios.get("/portfolio/all", {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = response.data;
        setDesignersList(data);
      } catch (error) {
        console.log("데이터 로드 실패", error);
      }
    };

    fetchDesigners();
  }, []);

  if (designersList === null) {
    return <div>Loading...</div>;
  }

  console.log(designersList);

  return (
    <div>
      <h2>디자이너 목록</h2>
      <ul>
        {designersList.map((designer, index) => (
          <li key={index}>{designer.explanation}</li>
        ))}
      </ul>
    </div>
  );
}

export default DesignerSelect;
