import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [cars, setCars] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [carId, setCarId] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/cars')
      .then(response => setCars(response.data))
      .catch(error => console.error(error));
    
    axios.get('http://localhost:5000/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error(error));
  }, []);

  const bookCar = () => {
    axios.post('http://localhost:5000/book', { carId, userId, startDate, endDate })
      .then(response => {
        alert('Car booked successfully');
        setCarId('');
        setUserId('');
        setStartDate('');
        setEndDate('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="App">
      <h1>Car Rental System</h1>
      <h2>Available Cars</h2>
      <ul>
        {cars.map(car => (
          <li key={car._id}>
            {car.name} - {car.model} ({car.year})
            <button onClick={() => setCarId(car._id)}>Book</button>
          </li>
        ))}
      </ul>
      <h2>Book a Car</h2>
      <div>
        <input 
          type="text" 
          placeholder="User ID" 
          value={userId} 
          onChange={e => setUserId(e.target.value)} 
        />
        <input 
          type="date" 
          placeholder="Start Date" 
          value={startDate} 
          onChange={e => setStartDate(e.target.value)} 
        />
        <input 
          type="date" 
          placeholder="End Date" 
          value={endDate} 
          onChange={e => setEndDate(e.target.value)} 
        />
        <button onClick={bookCar}>Book</button>
      </div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id}>
            Car: {booking.carId.name} - User: {booking.userId} - From: {new Date(booking.startDate).toLocaleDateString()} To: {new Date(booking.endDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
