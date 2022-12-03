export const mapTheme = [
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

export const mapStyles = [
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