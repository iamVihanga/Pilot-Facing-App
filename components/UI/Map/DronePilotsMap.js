import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { mapTheme, mapStyles } from "./mapStyles";
import { getEachPilotLocation } from "../../../config/supabaseFunctions";
import { LoadingSpinner } from "../../../components";
import dynamic from "next/dynamic";
// import Marker from "../../../components/UI/Map/Marker";

const DynamicMarker = dynamic(
  () => import("../../../components/UI/Map/Marker"),
  { ssr: false }
);

const DronePilotsMap = ({ center, zoom, pilots }) => {
  const [mapStyle, setMapStyle] = useState(mapTheme[0]);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [pilotLocations, setPilotLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Setup mapbox
  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_MAPBOX_TOKEN ?? "";
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle.style,
      center: center,
      zoom: zoom,
    });

    map.current.on("load", () => {});
  }, [mapStyle]);

  // Fetch coordinates for pilots
  useEffect(() => {
    const fetchPilotLocations = async () => {
      try {
        setLoading(true);
        const res_list = await getEachPilotLocation(pilots);

        setPilotLocations(res_list);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchPilotLocations();
  }, []);

  const handleMapStyle = () => {
    if (mapStyle.sattelite == true) {
      setMapStyle(mapTheme[0]);
    } else {
      setMapStyle(mapTheme[1]);
    }
  };

  useEffect(() => {
    if (pilotLocations.length !== 0) {
      pilotLocations.map((item) => {
        new mapboxgl.Marker()
          .setLngLat(item.location.center)
          .addTo(map.current);
      });
    }
  }, [pilotLocations]);

  return (
    <div
      className={`w-full h-full relative rounded-2xl flex flex-col items-center justify-center`}
    >
      {loading && (
        <div className="absolute top-5 bg-white p-2 rounded-full z-[1000] shadow-md">
          <LoadingSpinner width={9} height={9} color="teal-500" />
        </div>
      )}

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
      </div>
    </div>
  );
};

export default DronePilotsMap;
