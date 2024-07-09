import React from "react";
import Tab from "../../atoms/Tab";

const Tabs = ({ userType, setUserType }) => (
  <div>
    <h5>회원구분</h5>
    <ul className="tabs">
      {["purchaser", "seller", "designer"].map((type) => (
        <Tab
          key={type}
          active={userType === type}
          label={
            type === "purchaser"
              ? "일반회원"
              : type === "seller"
              ? "판매자"
              : "디자이너"
          }
          onClick={() => setUserType(type)}
        />
      ))}
    </ul>
  </div>
);

export default Tabs;
