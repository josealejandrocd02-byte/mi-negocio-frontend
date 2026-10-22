<<<<<<< HEAD
// components/maps/LocationPicker.tsx

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import { useState } from "react";

import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number;
  longitude: number;
  onChange: (
    latitude: number,
    longitude: number
  ) => void;
};

function LocationMarker({
  latitude,
  longitude,
  onChange,
}: Props) {
  useMapEvents({
    click(e) {
      onChange(
        e.latlng.lat,
        e.latlng.lng
      );
    },
  });

  return (
    <Marker
      draggable
      position={[latitude, longitude]}
      eventHandlers={{
        dragend: (e: any) => {
          const pos =
            e.target.getLatLng();

          onChange(
            pos.lat,
            pos.lng
          );
        },
      }}
    />
  );
}

export default function LocationPicker({
  latitude,
  longitude,
  onChange,
}: Props) {
  return (
    <div className="h-80 rounded-xl overflow-hidden border">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          latitude={latitude}
          longitude={longitude}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
=======
// components/maps/LocationPicker.tsx

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";

import { useState } from "react";

import "leaflet/dist/leaflet.css";

type Props = {
  latitude: number;
  longitude: number;
  onChange: (
    latitude: number,
    longitude: number
  ) => void;
};

function LocationMarker({
  latitude,
  longitude,
  onChange,
}: Props) {
  useMapEvents({
    click(e) {
      onChange(
        e.latlng.lat,
        e.latlng.lng
      );
    },
  });

  return (
    <Marker
      draggable
      position={[latitude, longitude]}
      eventHandlers={{
        dragend: (e: any) => {
          const pos =
            e.target.getLatLng();

          onChange(
            pos.lat,
            pos.lng
          );
        },
      }}
    />
  );
}

export default function LocationPicker({
  latitude,
  longitude,
  onChange,
}: Props) {
  return (
    <div className="h-80 rounded-xl overflow-hidden border">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          latitude={latitude}
          longitude={longitude}
          onChange={onChange}
        />
      </MapContainer>
    </div>
  );
>>>>>>> 38a01d0a (Actualizar front de productos y categorias)
}