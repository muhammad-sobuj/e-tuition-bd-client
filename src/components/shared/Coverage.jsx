import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Coverage = () => {
  const position = [23.6850, 90.3563];
  const mapRef = useRef(null);
  const [serviceCenters, setServiceCenters] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/service-centers')
      .then(res => res.json())
      .then(data => setServiceCenters(data));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;

    const district = serviceCenters.find(c =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district && mapRef.current) {
      mapRef.current.flyTo(
        [district.latitude, district.longitude],
        14
      );
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-5xl mb-6">
        We are available in 64 districts
      </h2>

      <form onSubmit={handleSearch} className="mb-4">
        <input
          name="location"
          type="search"
          placeholder="Search district"
          className="input input-bordered w-full max-w-md  px-8 py-3 rounded-2xl transition mr-4"
        />
        <input className='bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-2xl transition' type="submit" value="Search" />
      </form>

      <div className="border w-full h-[800px]">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenters.map((center, index) => (
            <Marker
              key={index}
              position={[center.latitude, center.longitude]}
            >
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area.join(', ')}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
