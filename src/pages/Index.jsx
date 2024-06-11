import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box } from '@chakra-ui/react';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Dummy data for buildings in Oslo
const buildings = [
  { id: 1, position: [59.911491, 10.757933], sensorData: 'Temperature: 20°C, Humidity: 30%' },
  { id: 2, position: [59.913868, 10.752245], sensorData: 'Temperature: 19°C, Humidity: 35%' },
  { id: 3, position: [59.914501, 10.733168], sensorData: 'Temperature: 21°C, Humidity: 28%' },
  // Add more buildings with dummy data as needed
];

const pinIcon = new Icon({
  iconUrl: '/pin-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const Index = () => {
  const [activeBuilding, setActiveBuilding] = useState(null);

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildings.map(building => (
        <Marker
          key={building.id}
          position={building.position}
          icon={pinIcon}
          eventHandlers={{
            click: () => {
              setActiveBuilding(building);
            },
          }}
        />
      ))}
      {activeBuilding && (
        <Popup
          position={activeBuilding.position}
          onClose={() => {
            setActiveBuilding(null);
          }}
        >
          <Box>
            <h2>Building Information</h2>
            <p>{activeBuilding.sensorData}</p>
          </Box>
        </Popup>
      )}
    </MapContainer>
  );
};

export default Index;