import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "../js/TopBar.js";
import style from "./DesignerSearch.module.css";

function DesignerSearch() {
  return (
    <div>
      <TopBar />
      <div className="DesignerSearch-array">
        <h6>정렬</h6>
      </div>
      <div className={style.DesignerSearchContainer}>
        <div className={style.DesignerSearchArticle}>
          <span className={style.designer_img}>
            <img src="Designer1.png" width={224} height={350} />
          </span>
          <span className={style.designer_img}>
            <img src="Designer2.png" width={224} height={350} />
          </span>
          <span className={style.designer_img}>
            <img src="Designer3.png" width={224} height={350} />
          </span>
        </div>
        <div className={style.DesignerSearchArticle}>
          <span className={style.designer_img}>
            <img src="Designer4.png" width={224} height={350} />
          </span>
          <span className={style.designer_img}>
            <img src="Designer5.png" width={224} height={350} />
          </span>
          <span className={style.designer_img}>
            <img src="Designer6.png" width={224} height={350} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default DesignerSearch;