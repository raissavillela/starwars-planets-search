import { useEffect, useState } from 'react';
import { DataApi, PlanetsContextType } from '../types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }: { children: React.ReactNode }) {
  const [apiData, setApiData] = useState<DataApi[]>([]);
  const [filteredPlanets, setFilteredPlanets] = useState<DataApi[]>(apiData);

  useEffect(() => {
    const getInfoApi = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setApiData(data.results);
      setFilteredPlanets(data.results);
    };

    getInfoApi();
  }, []);

  const value: PlanetsContextType = {
    planets: apiData,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <PlanetsContext.Provider value={ value }>
      { children }
    </PlanetsContext.Provider>
  );
}

export default PlanetsProvider;
