import { createContext } from 'react';
import { PlanetsContextType } from '../types';

const PlanetsContext = createContext({} as PlanetsContextType);

export default PlanetsContext;
