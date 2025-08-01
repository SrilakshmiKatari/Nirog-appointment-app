import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DoctorDetail() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch('/doctorData.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((doc) => doc.id === parseInt(id));
        setDoctor(found);
      });
  }, [id]);

  if (!doctor) return <p>Loading...</p>;

  return (
    <div className="doctor-detail">
      <img src={doctor.image} alt={doctor.name} />
      <h2>{doctor.name}</h2>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Availability:</strong> {doctor.availability}</p>
      <h4>Schedule:</h4>
      {doctor.schedule.length ? (
        <ul>
          {doctor.schedule.map((slot, index) => (
            <li key={index}>{new Date(slot).toLocaleString()}</li>
          ))}
        </ul>
      ) : (
        <p>No available slots</p>
      )}
      <Link to={`/book/${doctor.id}`}>
        <button>Book Appointment</button>
      </Link>
    </div>
  );
}

export default DoctorDetail;
