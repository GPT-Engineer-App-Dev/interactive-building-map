import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Text } from '@chakra-ui/react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Custom pin icon
const pinIcon = new L.Icon({
  iconUrl: require('../assets/pin-icon.png'),
  iconRetinaUrl: require('../assets/pin-icon.png'),
  iconSize: new L.Point(30, 30),
  className: 'leaflet-div-icon'
});

// Generate random coordinates for Oslo buildings
const generateRandomCoordinates = () => {
  const osloCenter = { lat: 59.9139, lng: 10.7522 };
  const radius = 0.05; // Roughly 5km
  return Array.from({ length: 10 }, () => ({
    lat: osloCenter.lat + (Math.random() - 0.5) * radius,
    lng: osloCenter.lng + (Math.random() - 0.5) * radius
  }));
};

const Index = () => {
  const [buildingPositions, setBuildingPositions] = useState([]);

  useEffect(() => {
    setBuildingPositions(generateRandomCoordinates());
  }, []);

  return (
    <MapContainer center={[59.9139, 10.7522]} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {buildingPositions.map((position, index) => (
        <Marker key={index} position={position} icon={pinIcon}>
          <Popup>
            <Box>
              <Text fontWeight="bold">Building {index + 1}</Text>
              <Text>Temperature: {Math.random() * 10 + 18}°C</Text>
              <Text>Humidity: {Math.random() * 50 + 30}%</Text>
              <Text>Energy Usage: {Math.random() * 10 + 5}kWh</Text>
            </Box>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Index;