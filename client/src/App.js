import { useState, useEffect } from "react";

import './App.css';

import SightingsForm from "./SightingsForm";
import SightingsGrid from "./SightingsGrid";
import { getSightings } from "./SightingService";

function App() {

  const [birdSightings, setBirdSightings] = useState([]);

//Setting the use effect on initial load
  useEffect(() => {
    getSightings().then((allSightings) => {
      setBirdSightings(allSightings);
    })
  }, []);

//Function to add a sighting
  const addSighting = (sighting) => {
    setBirdSightings([...birdSightings, sighting]);
  }

//Function to delete a sighting by ID
  const removeSighting = (id) => {
    const sightingsToKeep = birdSightings.filter(sighting => sighting._id !== id)
    setBirdSightings(sightingsToKeep);
  }

  return (
    <>
      <SightingsForm addSighting={addSighting} />
      <SightingsGrid sightings={birdSightings} removeSighting={removeSighting} />
    </>
  );
}

export default App;
