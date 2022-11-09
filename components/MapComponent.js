import React, { useState, useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const mapStyles = [
    {
        name: "light",
        sattelite: false,
        style: "mapbox://styles/onextechsolutions/ckxwst8bk4zkp15t393otx51q",
    },
    {
        name: "sattelite",
        sattelite: true,
        style: "mapbox://styles/mapbox/satellite-v9",
    },
];

const MapComponent = ({ center, zoom, polygon, area }) => {
    const [mapStyle, setMapStyle] = useState(mapStyles[0]);
    const mapContainer = useRef(null);
    const [mapObject, setMap] = useState();
    const map = useRef(null);

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_MAPBOX_TOKEN ?? "";
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: mapStyle.style,
            center: center,
            zoom: zoom
        })

        let Draw = new MapboxDraw({
            defaultMode: "draw_polygon",
            displayControlsDefault: false,
            userProperties: true,

            styles: map_styles,
        });
        
        map.current.addControl(Draw, "top-left");


        map.current.on('load', () => {
            // Set polygon to context state
            if (polygon != undefined) {
                Draw.set(polygon)
            }
        })

    }, [mapStyle])

    const handleMapStyle = () => {
        if (mapStyle.sattelite == true) {
            setMapStyle(mapStyles[0]);
        } else {
            setMapStyle(mapStyles[1]);
        }
    };

    return (
        <div className={`w-full h-[300px] relative rounded-2xl`}>
            <div className="overflow-hidden rounded-lg map-container w-full h-full relative" ref={mapContainer}>
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

                <div className="bg-white absolute p-3 bottom-9 left-2 rounded-lg z-20 font-semibold text-lg">{area} m<sup>2</sup></div>
            </div>
        </div>
    )
}

export default MapComponent


const map_styles = [
    {
        id: "gl-draw-polygon-fill-inactive",
        type: "fill",
        filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"],
        ],
        paint: {
            "fill-color": [
                "case",
                ["==", ["get", "user_class_id"], 1],
                "rgba(0, 102, 255, 0.50)",
                ["==", ["get", "user_class_id"], 2],
                "rgba(0, 102, 255, 0.50)",
                "rgba(0, 102, 255, 0.50)",
            ],
            "fill-outline-color": "rgba(0, 102, 255, 0.50)",
            "fill-opacity": 0.5,
        },
    },
    {
        id: "gl-draw-polygon-fill-active",
        type: "fill",
        filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
        paint: {
            "fill-color": "#22d3ee",
            "fill-outline-color": "rgba(0, 102, 255, 0.50)",
            "fill-opacity": 0.1,
        },
    },
    {
        id: "gl-draw-polygon-midpoint",
        type: "circle",
        filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
        paint: {
            "circle-radius": 3,
            "circle-color": "#fbb03b",
        },
    },
    {
        id: "gl-draw-polygon-stroke-inactive",
        type: "line",
        filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"],
        ],
        layout: {
            "line-cap": "round",
            "line-join": "round",
        },
        paint: {
            "line-color": "rgba(0, 102, 255, 0.50)",
            "line-width": 2,
        },
    },
    {
        id: "gl-draw-polygon-stroke-active",
        type: "line",
        filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
        layout: {
            "line-cap": "round",
            "line-join": "round",
        },
        paint: {
            "line-color": "rgba(0, 102, 255, 0.15)",

            "line-width": 4,
        },
    },

    {
        id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
        type: "circle",
        filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
        ],
        paint: {
            "circle-radius": 5,
            "circle-color": "#fff",
        },
    },
    {
        id: "gl-draw-polygon-and-line-vertex-inactive",
        type: "circle",
        filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
        ],
        paint: {
            "circle-radius": 5,
            "circle-color": "#fff",
            "circle-stroke-width": 1,
            "circle-stroke-color": "rgba(0, 102, 255, 0.50)",
        },
    },

    {
        id: "gl-draw-polygon-fill-static",
        type: "fill",
        filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
        paint: {
            "fill-color": "#22d3ee",
            "fill-outline-color": "#0369a1",
            "fill-opacity": 0.1,
        },
    },
    {
        id: "gl-draw-polygon-stroke-static",
        type: "line",
        filter: ["all", ["==", "mode", "static"], ["==", "$type", "Polygon"]],
        layout: {
            "line-cap": "round",
            "line-join": "round",
        },
        paint: {
            "line-color": "rgba(0, 102, 255, 0.15)",
            "line-width": 2,
        },
    },
]