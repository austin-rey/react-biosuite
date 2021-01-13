import * as React from 'react';
import ReactMapboxGl, { Layer, Source,ZoomControl} from "react-mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX,
    maxZoom : 3,
    minZoom : 1
  });

  const RASTER_SOURCE_OPTIONS = {
    "type": "raster",
    "tiles": [
        "https://api.gbif.org/v2/map/occurrence/density/0/0/0@1x.png?style=classic-noborder.poly&bin=hex&hexPerTile=70&taxonKey=2770879&srs=EPSG%3A4326",
        "https://api.gbif.org/v2/map/occurrence/density/0/1/0@1x.png?style=classic-noborder.poly&bin=hex&hexPerTile=70&taxonKey=2770879&srs=EPSG%3A4326",
    ],
    "tileSize": 512
  };

const MapboxGLMap = () => {
    return (
        <>
        <Map
        zoom={[1]}
        // fitBounds={[[-47, 0], [-73, 45]]}
        // maxBounds={[[-47, 0], [0,0]]}
        // center={[-47,90]}
        style="mapbox://styles/mapbox/navigation-preview-night-v4"
        containerStyle={{
          height: '600px',
          width: '1024px'
        }}
      >
          <ZoomControl />
          <Source id="source_id" tileJsonSource={RASTER_SOURCE_OPTIONS} />
          <Layer type="raster" id="layer_id" sourceId="source_id"/>
      </Map>
      </>
    )
}

export default MapboxGLMap;