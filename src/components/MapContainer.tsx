import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Circle } from '@react-google-maps/api';
import { googleAPIKey } from '../secrets';
import { useSelector } from 'react-redux';
import { ItineraryActivity } from '../redux/activityInstances';
import InfoMarker from './InfoAndMarker';
import { IonSpinner, useIonViewWillEnter } from '@ionic/react';

import { Geolocation } from '@capacitor/core';

// someone else should make this not look awful!
const mapContainerStyle = {
  height: '80%',
  width: '80%',
};

interface Position {
  lat: number;
  lng: number;
}

const scheduleToPosition = (activity: ItineraryActivity) => {
  const { locationLong, locationLat } = activity;
  if (locationLong && locationLat) {
    const position: Position = {
      lat: locationLat,
      lng: locationLong,
    };
    return position;
  } else
    return {
      lat: 0,
      lng: 0,
    };
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleAPIKey,
  });

  //@ts-ignore
  const lat = useSelector(state => state.planningItinerary.startLocationLat);
  //@ts-ignore
  const lng = useSelector(state => state.planningItinerary.startLocationLong);

  const center = {
    lat,
    lng,
  };

  const [location, setLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const options = {
    strokeColor: '#0000FF',
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: '#0000FF',
    fillOpacity: 1,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 20,
    zIndex: 1,
  };
  useIonViewWillEnter(async () => {
    const geo = await Geolocation.getCurrentPosition()
      .then(geo => {
        const { latitude, longitude } = geo.coords;
        setLocation({
          lat: latitude,
          lng: longitude,
        });
      })
      .catch(e => {
        console.log('error finding user');
        console.error(e);
      });
  });

  const scheduled = useSelector(
    //@ts-ignore
    state => state.activityInstances.scheduledActivities
  );

  const renderMap = () => {
    return (
      <GoogleMap
        id="markers"
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
      >
        <Circle options={options} center={location} radius={10} />
        {scheduled.map((activity: ItineraryActivity, idx: number) => {
          const position: Position = scheduleToPosition(activity);
          const { name } = activity;
          //@ts-ignore
          return <InfoMarker position={position} name={name} key={idx} />;
        })}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>The map cannot be loaded right now.</div>;
  }
  return isLoaded ? renderMap() : <IonSpinner />;
};

export default Map;
