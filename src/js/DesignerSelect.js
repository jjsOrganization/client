import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";

function DesignerSelect() {
  const [designersList, setDesignersList] = useState();

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

  //  // 사용자가 디자이너를 선택하고 콜백 함수를 호출하는 예시 함수
  // const selectDesigner = (selectedDesigner) => {
  //   // 사용자가 선택한 디자이너 정보를 콜백 함수로 전달
  //   if (props.onDesignerSelect) {
  //     props.onDesignerSelect(selectedDesigner);
  //   }
  // };

  return (
    <div>
      <div></div>
    </div>
  );
}

export default DesignerSelect;
