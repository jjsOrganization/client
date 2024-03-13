import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TopBar from "../js/TopBar.js";

function DesignerRanking() {
  const [designs, setDesigns] = useState([
    {
      id: 1,
      beforeImgUrl: "https://i.postimg.cc/j26N1y0d/Kakao-Talk-20240222-165118540.png",
      afterImgUrl: "https://i.postimg.cc/d1yG8z5C/Kakao-Talk-20240222-165113330.png",
      likes: 0
    },
    {
      id: 2,
      beforeImgUrl: "https://i.postimg.cc/L6TLBk3x/Kakao-Talk-20240222-165125269.png",
      afterImgUrl: "https://i.postimg.cc/3r2gWQ45/Kakao-Talk-20240222-165136159.png",
      likes: 0
    },
    {
      id: 3,
      beforeImgUrl: "https://i.postimg.cc/nrfBT0WP/Kakao-Talk-20240222-165139875.png",
      afterImgUrl: "https://i.postimg.cc/m2R7HpCc/Kakao-Talk-20240222-165153727.png",
      likes: 0
    }
  ]);

  const handleLike = (id) => {
    setDesigns((prevDesigns) => {
      return prevDesigns.map((design) =>
        design.id === id ? { ...design, likes: design.likes + 1 } : design
      );
    });
  };

  useEffect(() => {
    // 좋아요 수에 따라 디자인을 정렬
    setDesigns((prevDesigns) =>
      prevDesigns.slice().sort((a, b) => b.likes - a.likes)
    );
  }, [designs]); // designs 상태가 업데이트될 때마다 실행

  const styles = {
    centerText: {
      textAlign: "center"
    }
  };

  return (
    <div>
      <TopBar />
      <div className="pageInfo">
        <h3>현재 사용자들이 가장 선호하는 디자인</h3>
        <p style={styles.centerText}>(사진을 클릭하시면 상세 정보로 이동합니다)</p>
      </div>
      <div className="product">
        <Container>
          <Row>
            {designs.map((design) => (
              <React.Fragment key={design.id}>
                <Col sm={6}>
                  <img
                    src={design.beforeImgUrl}
                    width={445}
                    height={360}
                    alt="원본"
                  />
                  <h4>원본</h4>
                </Col>
                <Col sm={6}>
                  <img
                    src={design.afterImgUrl}
                    width={445}
                    height={360}
                    alt="리폼 완성본"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleLike(design.id)}
                  />
                  <h4>
                    리폼 완성본&nbsp;
                    <span onClick={() => handleLike(design.id)}>👍</span>{" "}
                    {design.likes}
                  </h4>
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DesignerRanking;