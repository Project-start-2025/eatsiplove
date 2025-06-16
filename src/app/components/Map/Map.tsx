import React, { useCallback, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 10.762622,
  lng: 106.660172,
};

interface MyMapComponentProps {
  /** Hàm callback trả về vị trí tọa độ khi chọn trên bản đồ */
  onSelectPosition?: (latLng: { lat: number; lng: number }) => void;
}

const MyMapComponent: React.FC<MyMapComponentProps> = ({ onSelectPosition }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  // Hàm xử lý khi click lên bản đồ
  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return;

      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      setMarkerPosition({ lat, lng });

      if (onSelectPosition) onSelectPosition({ lat, lng });
    },
    [onSelectPosition]
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={markerPosition}
      zoom={15}
      onClick={handleMapClick}
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};

export default React.memo(MyMapComponent);