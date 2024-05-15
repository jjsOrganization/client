import "../css/Visual.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import styled from "styled-components";
Chart.register(ArcElement);

const RightContainer = styled.div`
  width: 805px;
  height: 690px;
  position: absolute;
  right: 0px;
  background-color: skyblue;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const TabButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ active }) => (active ? "lightblue" : "white")};
  border: 1px solid black;
  cursor: pointer;
`;

function Visual() {
  const [showWaterSaved, setShowWaterSaved] = useState(false);
  const [waterData, setWaterData] = useState({});
  const [activeTab, setActiveTab] = useState("animation");

  useEffect(() => {
    setTimeout(() => {
      setShowWaterSaved(true);
    }, 3000);
  }, []);

  const fetchWater = async () => {
    try {
      const response = await axiosInstance.get("/calculate/saveWater", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = response.data.data;
      setWaterData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching water data:", error);
    }
  };

  useEffect(() => {
    fetchWater();
  }, []);

  if (Object.keys(waterData).length === 0) {
    return <div>Loading...</div>;
  }

  const expData = {
    labels: [
      "accessories",
      "bottoms",
      "hat",
      "one_piece",
      "outer",
      "skirt",
      "socks",
      "top",
      "underwear",
    ],
    datasets: [
      {
        data: Object.values(waterData),
        borderWidth: 2,
        hoverBorderWidth: 3,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)",
          "rgba(255, 198, 0, 1)",
          "rgba(155, 100, 200, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(255, 0, 255, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(0, 0, 255, 1)",
        ],
      },
    ],
  };

  return (
    <div>
      <TopBar />
      <TabContainer>
        <TabButton
          active={activeTab === "animation"}
          onClick={() => setActiveTab("animation")}
        >
          Animation
        </TabButton>
        <TabButton
          active={activeTab === "chart"}
          onClick={() => setActiveTab("chart")}
        >
          Chart
        </TabButton>
      </TabContainer>
      {activeTab === "animation" && (
        <div className="pipe">
          <div className="valve"></div>
          <div className="pipe1"></div>
          <div className="pipe2"></div>
          <div className="water"></div>
          <div className="waterRise"></div>
          {showWaterSaved && (
            <div className="waterSavedMessage">
              <h4>
                아낀 물의 총량:{" "}
                {Object.values(waterData).reduce((acc, cur) => acc + cur, 0)}L
              </h4>
            </div>
          )}
        </div>
      )}
      {activeTab === "chart" && (
        <div className="chart-container">
          <RightContainer>
            <Doughnut
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  tooltip: {
                    enabled: true,
                    callbacks: {
                      label: function (context) {
                        var label = context.label || "";
                        if (label) {
                          label += ": ";
                        }
                        if (context.parsed && context.parsed.length > 0) {
                          label += context.parsed[0].toFixed(2) + "L";
                        }
                        return label;
                      },
                    },
                  },
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
              data={expData}
              style={{
                position: "relative",
                right: "0px",
              }}
            />
          </RightContainer>
        </div>
      )}
    </div>
  );
}

export default Visual;
