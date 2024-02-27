import React, { useContext, useEffect, useState } from 'react';
import PlanetsContext from './context/PlanetsContext';
import { DataApi, FilterType, AssortType } from './types';
import Filters from './Filters';
import AssortPlanets from './AssortPlanets';

const firstValues = {
  column: 'population',
  comparison: 'maior que',
  amount: '0',
};

const comparisonFilter = [
  'maior que',
  'menor que',
  'igual a',
];

const columnsFilter = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

function FilterPlanetName() {
  const { planets, setFilteredPlanets } = useContext(PlanetsContext);

  const [name, setName] = useState('');
  const [formValue, setFormValue] = useState<FilterType>(firstValues);
  const [options, setOptions] = useState<string[]>(columnsFilter);
  const [filterList, setFilterList] = useState<FilterType[]>([]);
  const [assort, setAssort] = useState<AssortType>({
    column: columnsFilter[0],
    sort: 'ASC',
  });

  useEffect(() => filterPlanets(), [options]);

  const getFilterPlanets = (inputValue: string) => {
    const result = planets
      .filter((planet) => planet.name.toLocaleLowerCase()
        .includes(inputValue.toLocaleLowerCase()));
    setFilteredPlanets(result);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    getFilterPlanets(e.target.value);
  };

  const filterPlanets = () => {
    const result = planets.filter((planet: DataApi) => {
      return filterList.every((filter) => {
        switch (filter.comparison) {
          case 'maior que':
            return Number(planet[filter.column as keyof DataApi])
            > Number(filter.amount);
          case 'menor que':
            return Number(planet[filter.column as keyof DataApi])
            < Number(filter.amount);
          default:
            return Number(planet[filter.column as keyof DataApi])
            === Number(filter.amount);
        }
      });
    });

    setFilteredPlanets(result);
  };

  const comparePlanets = (
    a: DataApi,
    b: DataApi,
    column: keyof DataApi,
    sort: string,
  ) => {
    const numericA = Number(a[column]);
    const numericB = Number(b[column]);
    if (!Number.isNaN(numericA) && !Number.isNaN(numericB)) {
      return sort === 'ASC' ? numericA - numericB : numericB - numericA;
    }

    const stringA = String(a[column]);
    const stringB = String(b[column]);

    return stringA.localeCompare(stringB);
  };

  const assortPlanets = () => {
    setFilteredPlanets((prevState) => {
      const sortedPlanets = [...prevState].sort((a, b) => {
        return comparePlanets(a, b, assort.column as keyof DataApi, assort.sort);
      });
      return sortedPlanets;
    });
  };

  const handleAddFilter = () => {
    setFilterList((prevState) => {
      const newFilterList = [...prevState, formValue];
      const columnsList = newFilterList.map((item) => item.column);
      const optionsList = columnsFilter
        .filter((item) => !columnsList.includes(item));
      setOptions(optionsList);
      setFormValue({
        ...firstValues,
        column: optionsList.length > 0 ? optionsList[0] : '',
      });

      return newFilterList;
    });
  };

  const handleRemoveFilter = (column: string) => {
    const result = filterList.filter((filter) => filter.column !== column);
    setFilterList(result);

    const newOptionsList = [...options, column];
    setOptions(newOptionsList);
  };

  const handleRemoveAllFilters = () => {
    setFilterList([]);
    setOptions(columnsFilter);
    setFormValue({
      ...firstValues,
      column: columnsFilter[0],
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeOrder = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    setAssort((prevAssort) => ({
      ...prevAssort,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="name-filter">
            <input
              data-testid="name-filter"
              type="text"
              name="planetName"
              id="name-filter"
              placeholder="Planet Name..."
              value={ name }
              onChange={ handleChangeName }
            />
          </label>
        </div>
        <div>
          <label htmlFor="column-filter">
            <select
              data-testid="column-filter"
              name="column"
              id="column-filter"
              onChange={ handleChange }
              value={ formValue.column }
            >
              {options.map((column) => (
                <option
                  value={ column }
                  key={ column }
                >
                  {column}
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="comparison-filter">
            <select
              data-testid="comparison-filter"
              name="comparison"
              id="comparison-filter"
              onChange={ handleChange }
              value={ formValue.comparison }
            >
              {comparisonFilter.map((comparison) => (
                <option
                  value={ comparison }
                  key={ comparison }
                >
                  { comparison }
                </option>
              ))}
            </select>
          </label>

          <label htmlFor="value-filter">
            <input
              data-testid="value-filter"
              type="number"
              name="amount"
              id="value-filter"
              min={ 0 }
              onChange={ handleChange }
              value={ formValue.amount }
            />
          </label>
          <button
            data-testid="button-filter"
            type="button"
            onClick={ () => {
              filterPlanets();
              handleAddFilter();
            } }
          >
            Filtrar
          </button>
        </div>
      </form>
      <AssortPlanets
        assort={ assort }
        handleChangeAssort={ handleChangeOrder }
        columnsFilter={ columnsFilter }
        assortPlanets={ assortPlanets }
      />
      <Filters
        filterList={ filterList }
        handleRemoveFilter={ handleRemoveFilter }
        handleRemoveAllFilters={ handleRemoveAllFilters }
      />
    </>
  );
}
export default FilterPlanetName;
