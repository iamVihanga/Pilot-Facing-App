import React, { useState } from 'react'
import ReactMapboxGL, { Source, Layer } from '@urbica/react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import geojsonArea from '@mapbox/geojson-area'

const MapComponent = () => {
    const [viewport, setViewport] = useState({
        latitude: 45.137451,
        longitude: -68.137343,
        zoom: 5
    })

    const geoJsonData = {
        'type': 'Feature',
        'geometry': {
            'type': 'Polygon',
            // These coordinates outline Maine.
            'coordinates': [
                [
                    [-67.13734, 45.13745],
                    [-66.96466, 44.8097],
                    [-68.03252, 44.3252],
                    [-69.06, 43.98],
                    [-70.11617, 43.68405],
                    [-70.64573, 43.09008],
                    [-70.75102, 43.08003],
                    [-70.79761, 43.21973],
                    [-70.98176, 43.36789],
                    [-70.94416, 43.46633],
                    [-71.08482, 45.30524],
                    [-70.66002, 45.46022],
                    [-70.30495, 45.91479],
                    [-70.00014, 46.69317],
                    [-69.23708, 47.44777],
                    [-68.90478, 47.18479],
                    [-68.2343, 47.35462],
                    [-67.79035, 47.06624],
                    [-67.79141, 45.70258],
                    [-67.13734, 45.13745]
                ]
            ]
        }

    }

    return (
        <div>
            <ReactMapboxGL
                className='w-full h-[300px] relative rounded-2xl'
                mapStyle={'mapbox://styles/onextechsolutions/ckxwst8bk4zkp15t393otx51q'}
                accessToken={process.env.NEXT_MAPBOX_TOKEN}
                onViewportChange={viewport => setViewport(viewport)}
                {...viewport}
            >
                <Source
                    id='maine'
                    type="geojson"
                    data={geoJsonData}
                />

                <Layer
                    id="maine"
                    type="fill"
                    source="maine"
                    paint={{
                        'fill-color': '#0080ff', // blue color fill
                        'fill-opacity': 0.5
                    }}
                />
                <Layer
                    id="outline"
                    type="line"
                    source="maine"
                    paint={{
                        'line-color': '#000',
                        'line-width': 3
                    }}
                />
                <h2 className='absolute bg-white p-4 rounded-md bottom-10 left-8 shadow-xl font-bold text-lg'>{geojsonArea.geometry(geoJsonData.geometry)} m<sup>2</sup> </h2>
            </ReactMapboxGL>

        </div>
    )
}

export default MapComponent