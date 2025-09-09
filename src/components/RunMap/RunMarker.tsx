import { Marker } from 'react-map-gl';
import styles from './style.module.css';
import logoImage from '../../../assets/logo.jpg';

interface IRunMarkerProperties {
  longitude: number;
  latitude: number;
}

function RunMarker({ longitude, latitude }: IRunMarkerProperties) {
  return (
    <Marker
      longitude={longitude}
      latitude={latitude}
      pitchAlignment="map"
      anchor="center"
    >
      <div className={styles.markerStart}>
        <img
          src={logoImage}
          alt="Runner"
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
      </div>
    </Marker>
  );
}

export default RunMarker;
