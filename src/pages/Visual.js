import "../css/Visual.css";
import React, { useEffect, useState } from "react";

import "../component/TopBar.js";
import TopBar from "../component/TopBar.js";

function Visual() {
  const [showWaterSaved, setShowWaterSaved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowWaterSaved(true);
    }, 3000);
  }, []);

  return (
    <div>
      <TopBar />
      <div className="pipe">
        {/* 탑 바를 컴포턴트화 시켜서 관리를 좀더 편하게 하려고함 */}
        <div className="valve"></div>
        <div className="pipe1"></div>
        <div className="pipe2"></div>
        <div className="water"></div>
        <div className="waterRise"></div>
        {showWaterSaved && (
          <div className="waterSavedMessage">
            <h4>아낀 물의 총량: 00L</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Visual;