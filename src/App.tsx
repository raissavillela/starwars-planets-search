import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';
import { DataApi } from './types';

function App() {
  const [apiData, setApiData] = useState<DataApi[]>([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => setApiData(data.results));
  }, []);
  return (
    <>
      <h1>Star Wars</h1>
      <Table planetInformation={ apiData } />
    </>
  );
}

export default App;
