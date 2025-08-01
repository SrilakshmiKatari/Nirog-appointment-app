import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/doctorData.json')
      .then(res => res.json())
      .then(data => setDoctors(data));
  }, []);

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Find Your Doctor</h1>
      <input
        type="text"
        placeholder="Search by name or specialization"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="doctor-list">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="doctor-card">
            <img src={doctor.image} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            <span className={`status ${doctor.availability.replace(/\s/g, '')}`}>
              {doctor.availability}
            </span>
            <Link to={`/doctor/${doctor.id}`}>View Profile</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
