import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function BookAppointment() {
  const { doctorId } = useParams();
  const [form, setForm] = useState({ name: '', email: '', datetime: '' });
  const [submitted, setSubmitted] = useState(false);
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    fetch('/doctorData.json')
      .then(res => res.json())
      .then(data => {
        const doc = data.find(d => d.id === parseInt(doctorId));
        setDoctor(doc);
      });
  }, [doctorId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.datetime) {
      alert("Please fill out all fields.");
      return;
    }

    // You can store this in localStorage if needed
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="confirmation">
        <h2>Appointment Confirmed!</h2>
        <p>
          Thank you, <strong>{form.name}</strong>.<br />
          Your appointment with <strong>{doctor?.name}</strong> is scheduled for:<br />
          <strong>{new Date(form.datetime).toLocaleString()}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="book-form">
      <h2>Book Appointment with {doctor?.name}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} />
        <input type="datetime-local" name="datetime" value={form.datetime} onChange={handleChange} />
        <button type="submit">Confirm Appointment</button>
      </form>
    </div>
  );
}

export default BookAppointment;
