import "../css/Visual.css";
import React, { useEffect, useState } from "react";
import axiosInstance from "../component/jwt.js";
import TopBar from "../component/TopBar.js";
import { Doughnut, Bar, Chart } from "react-chartjs-2";

import { Chart as ChartJS } from "chart.js/auto";

function Visual() {
  const [showWaterSaved, setShowWaterSaved] = useState(false);
  const [waterData, setWaterData] = useState({});

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

  const doughnutData = {
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
        label: "아낀 물의 양",
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
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [
          waterData.accessories,
          waterData.bottoms,
          waterData.hat,
          waterData.one_piece,
          waterData.outer,
          waterData.skirt,
          waterData.socks,
          waterData.top,
          waterData.underwear,
        ],
      },
    ],
  };

  const barData = {
    labels: ["아낀 물의 양"],
    datasets: [
      {
        label: "accessories",
        backgroundColor: "rgba(238, 102, 121, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.accessories],
      },
      {
        label: "bottoms",
        backgroundColor: "rgba(98, 181, 229, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.bottoms],
      },
      {
        label: "hat",
        backgroundColor: "rgba(255, 198, 0, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.hat],
      },
      {
        label: "one_piece",
        backgroundColor: "rgba(155, 100, 200, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.one_piece],
      },
      {
        label: "outer",
        backgroundColor: "rgba(0, 255, 255, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.outer],
      },
      {
        label: "skirt",
        backgroundColor: "rgba(255, 0, 255, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.skirt],
      },
      {
        label: "socks",
        backgroundColor: "rgba(0, 255, 0, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.socks],
      },
      {
        label: "top",
        backgroundColor: "rgba(255, 0, 0, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.top],
      },
      {
        label: "underwear",
        backgroundColor: "rgba(0, 0, 255, 1)",
        borderColor: "rgba(0,0,0,0)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75,192,192,0.6)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [waterData.underwear],
      },
    ],
  };

  return (
    <div>
      <TopBar />
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

      <div className="bar-container">
        <Bar
          options={{
            maintainAspectRatio: false,
          }}
          data={barData}
        />
      </div>

      <div className="doughnut-container">
        <Doughnut
          options={{
            maintainAspectRatio: false,
          }}
          data={doughnutData}
        />
      </div>
    </div>
  );
}

export default Visual;
