import { AssortType } from './types';

type AssortPlanetsProps = {
  assort: AssortType;
  handleChangeAssort:
  (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  columnsFilter: string[];
  assortPlanets: () => void;
};

function AssortPlanets({
  assort, handleChangeAssort, columnsFilter, assortPlanets,
}: AssortPlanetsProps) {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="column-sort">
            <select
              data-testid="column-sort"
              name="column"
              id="column-sort"
              onChange={ handleChangeAssort }
              value={ assort.column }
            >
              {columnsFilter.map((column) => (
                <option
                  value={ column }
                  key={ column }
                >
                  {column}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="asc">
            Crescente
            <input
              type="radio"
              name="sort"
              id="asc"
              data-testid="column-sort-input-asc"
              value="ASC"
              checked={ assort.sort === 'ASC' }
              onChange={ handleChangeAssort }
            />
          </label>
          <label htmlFor="des">
            Decrescente
            <input
              type="radio"
              name="sort"
              id="des"
              data-testid="column-sort-input-desc"
              value="DES"
              checked={ assort.sort === 'DES' }
              onChange={ handleChangeAssort }
            />
          </label>
          <button
            data-testid="column-sort-button"
            type="button"
            onClick={ assortPlanets }
          >
            Filtrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AssortPlanets;
