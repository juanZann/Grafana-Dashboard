import React, { useState, useEffect } from 'react';
import './App.css';
import AddNewPlaceForm from './components/AddNewPlaceForm';
import PlacesTable from './components/PlacesTable';
import Header from './components/Header';
import axios from 'axios';

function App() {
  const [places, setPlaces] = useState([]);
  const [placeToEdit, setPlaceToEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load saved places from Flask backend
    axios.get('http://127.0.0.1:5000/places')
      .then((response) => {
        setPlaces(response.data);
      })
      .catch((error) => {
        console.error('Error fetching places:', error);
      });
  }, []);

  const handleAddPlace = (place) => {
    axios.post('http://127.0.0.1:5000/places', place)
      .then((response) => {
        setPlaces((prevPlaces) => [...prevPlaces, place]);
      })
      .catch((error) => {
        console.error('Error adding place:', error);
      });
  };

  const handleEditPlace = (id) => {
    const placeIndex = places.findIndex((place) => place.id === id);
    setEditIndex(placeIndex);
    setPlaceToEdit(places[placeIndex]);
  };

  const handleEditComplete = (updatedPlace) => {
    axios.put(`http://127.0.0.1:5000/places/${updatedPlace.id}`, updatedPlace)
      .then((response) => {
        const updatedPlaces = [...places];
        updatedPlaces[editIndex] = updatedPlace;
        setPlaces(updatedPlaces);
        setPlaceToEdit(null);
        setEditIndex(null);
      })
      .catch((error) => {
        console.error('Error updating place:', error);
      });
  };

  const handleDeletePlace = (id) => {
    axios.delete(`http://127.0.0.1:5000/places/${id}`)
      .then((response) => {
        const updatedPlaces = places.filter((place) => place.id !== id);
        setPlaces(updatedPlaces);
      })
      .catch((error) => {
        console.error('Error deleting place:', error);
      });
  };

  return (
    <div className="App">
      <Header />
      <AddNewPlaceForm onAddPlace={handleAddPlace} placeToEdit={placeToEdit} onEditComplete={handleEditComplete} />
      <PlacesTable places={places} onEditPlace={handleEditPlace} onDeletePlace={handleDeletePlace} />
    </div>
  );
}

export default App;