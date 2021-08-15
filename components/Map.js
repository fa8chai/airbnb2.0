import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import getCenter from 'geolib/es/getCenter';


function Map({ searchResults }) {
    
    const [selectedLocation, setSelectedLocaton] = useState({});

    // Transform the searchResults array 
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 8
    })
    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/fami199/cks0i4usw60w718nxn2h92462'
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(nextViewport) => setViewport(nextViewport)}
        >
            {searchResults.map(result => (
                <div key={result.long}>
                    <Marker
                        longitude={result.longitude}
                        latitude={result.latitude}
                        offsetLeft={-20}
                        offsetTop={-10}
                    >
                        <p

                            className='cursor-pointer text-2xl animate-bounce'
                            onClick={() => setSelectedLocaton(result)}
                            aria-label='push-pin'
                        >📌</p>
                    </Marker>

                    {
                    selectedLocation.long === result.long ? (
                            <Popup
                                closeOnClick={true}
                                onClose={() => setSelectedLocaton({})}
                                latitude={result.latitude}
                                longitude={result.longitude}
                            >{result.title}</Popup>
                    ) : (false)
                }
                </div>
            ))}


        </ReactMapGL>
    )
}

export default Map

