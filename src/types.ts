export type DataApi = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type SelectionType = {
  columnsFilter: string[];
  comparisonFilter: string[];
};

export type FilterType = {
  column: string;
  comparison: string;
  amount: string;
};

export type PlanetsContextType = {
  planets: DataApi[];
  filteredPlanets: DataApi[];
  setFilteredPlanets: React.Dispatch<React.SetStateAction<DataApi[]>>;
};
