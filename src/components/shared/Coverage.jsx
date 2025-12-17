import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet"; 
import "leaflet/dist/leaflet.css";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Coverage = () => {
  const position = [23.685, 90.3563]; 
  const mapRef = useRef(null);
  const [serviceCenters, setServiceCenters] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch("https://etuitonbd-api-server.vercel.app/service-centers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch service centers");
        return res.json();
      })
      .then((data) => {
        setServiceCenters(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();

    if (!location) return;

    const district = serviceCenters.find(
      (c) =>
        c.district.toLowerCase() === location.toLowerCase() || 
        c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district && mapRef.current) {
      mapRef.current.flyTo([district.latitude, district.longitude], 12);
    } else {
      alert("District not found!");
    }

    e.target.location.value = ""; 
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        We are available in 64 districts
      </h2>

      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row gap-4 mb-8 justify-center"
      >
        <input
          name="location"
          type="search"
          placeholder="Search district (e.g., Dhaka, Chittagong)"
          className="input input-bordered w-full max-w-md px-6 py-4 rounded-2xl text-lg"
          required
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-8 py-4 rounded-2xl transition"
        >
          Search
        </button>
      </form>

      <div className="border rounded-xl overflow-hidden shadow-lg h-[600px] md:h-[800px]">
        {loading && (
          <div className="flex items-center justify-center h-full">
            Loading map...
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full text-red-500">
            Error: {error}
          </div>
        )}

        {!loading && !error && (
          <MapContainer
            center={position}
            zoom={7} 
            scrollWheelZoom={true} 
            style={{ height: "100%", width: "100%" }}
            whenReady={(mapInstance) => {
              mapRef.current = mapInstance.target;  
            }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <div className="text-center">
                    <strong className="text-lg">{center.district}</strong>
                    <br />
                    <small>
                      Service Areas: {center.covered_area?.join(", ") || "N/A"}
                    </small>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
};

export default Coverage;
