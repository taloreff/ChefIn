import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const API_KEY = 'AIzaSyB24fmoFy0PfYJeqW1F7Ida3Ok3IlwDZUw';

interface MapContainerProps {
    lat: number;
    lng: number;
}

export const MapContainer: React.FC<MapContainerProps> = ({ lat, lng }) => {
    const mapContainerStyle = {
        width: '100%',
        height: '500px',
    };

    const center = {
        lat: lat,
        lng: lng,
    };

    return (
        <LoadScript googleMapsApiKey={API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={10}>
                <Marker position={{ lat: lat, lng: lng }} />
            </GoogleMap>
        </LoadScript>
    );
};
