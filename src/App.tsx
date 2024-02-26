import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';
import FilterPlanetName from './FilterPlanetName';

function App() {
  return (
    <>
      <h1>Projeto Star Wars - Trybe</h1>
      <FilterPlanetName />
      <Table />
    </>
  );
}

export default App;
