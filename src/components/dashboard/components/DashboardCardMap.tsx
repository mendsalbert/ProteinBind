"use client";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/jsvectormap.css";
import React, { useEffect } from "react";
import "../../../js/us-aea-en";
import "../../../js/world";

const MapOne: React.FC = () => {
  useEffect(() => {
    const mapOne = new jsVectorMap({
      selector: "#mapOne",
      map: "world",
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        hover: {
          fillOpacity: 1,
          fill: "#3056D3",
        },
      },
      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },

      labels: {
        regions: {
          render(code: string) {
            return code.split("-")[1];
          },
        },
      },
    });

    return () => {
      const map = document.getElementById("mapOne");
      if (map) {
        map.innerHTML = "";
      }
      // mapOne.destroy();
    };
  }, []);

  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-[#181818] dark:bg-[#181818] xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        All over the world
      </h4>
      <div className="h-90">
        <div id="mapOne" className="mapOne map-btn"></div>
      </div>
    </div>
  );
};

export default MapOne;
