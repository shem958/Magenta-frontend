import dynamic from "next/dynamic";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

const Map = ({ deliveries }) => {
  useEffect(() => {
    import("leaflet").then((L) => {
      // Fix the default icon issue with Leaflet
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });
    });
  }, []);

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {deliveries.map((delivery) => (
        <Marker
          key={delivery.id}
          position={[delivery.location.lat, delivery.location.lng]}
        >
          <Popup>
            {delivery.name} <br /> {delivery.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

// Dynamically import the Map component to ensure it is only rendered on the client side
export default dynamic(() => Promise.resolve(Map), { ssr: false });
