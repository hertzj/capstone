import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';

const InfoMarker: React.FC = props => {
  const [isOpen, setIsOpen] = useState(false);

  // figure out destructuring typing
  //@ts-ignore
  // const [position, name] = props;

  const position = props.position;
  //@ts-ignore
  const name = props.name;

  return (
    <Marker position={position} onClick={() => setIsOpen(true)}>
      {isOpen && (
        <InfoWindow position={position} onCloseClick={() => setIsOpen(false)}>
          <div>
            <h4>{name}</h4>
          </div>
        </InfoWindow>
      )}
    </Marker>
  );
};

export default InfoMarker;
