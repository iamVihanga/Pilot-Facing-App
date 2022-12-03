import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { mapTheme, mapStyles } from "./mapStyles";

const MapComponent = ({ center, zoom, polygon, area }) => {
  const [mapStyle, setMapStyle] = useState(mapTheme[0]);
  const mapContainer = useRef(null);
  const [mapObject, setMap] = useState();
  const map = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_MAPBOX_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle.style,
      center: center,
      zoom: zoom,
    });

    let Draw = new MapboxDraw({
      defaultMode: "draw_polygon",
      displayControlsDefault: false,
      userProperties: true,

      styles: mapStyles,
    });

    map.current.addControl(Draw, "top-left");

    map.current.on("load", () => {
      // Set polygon to context state
      if (polygon != undefined) {
        Draw.set(polygon);
      }
    });
  }, [mapStyle]);

  const handleMapStyle = () => {
    if (mapStyle.sattelite == true) {
      setMapStyle(mapTheme[0]);
    } else {
      setMapStyle(mapTheme[1]);
    }
  };

  return (
    <div className={`w-full h-[300px] relative rounded-2xl`}>
      <div
        className="overflow-hidden rounded-lg map-container w-full h-full relative"
        ref={mapContainer}
      >
        <div
          onClick={handleMapStyle}
          className={
            mapStyle.sattelite
              ? `bg-[#00000042] cursor-pointer absolute top-3 right-3 bg-red z-20 border border-solid py-1 px-2 rounded-md bg-sattelite text-white font-poppins uppercase`
              : `bg-[#00000042] cursor-pointer absolute top-3 right-3 bg-red z-20 border border-solid py-1 px-2 rounded-md bg-input-bg uppercase text-white `
          }
        >
          {mapStyle.name}
        </div>

        <div className="bg-white absolute p-3 bottom-9 left-2 rounded-lg z-20 font-semibold text-lg">
          {area} m<sup>2</sup>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
