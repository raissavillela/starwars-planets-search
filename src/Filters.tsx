import { FilterType } from './types';

type FilterProps = {
  filterList: FilterType[];
};

function Filters({ filterList }: FilterProps) {
  return (
    <div className="containerFilters">
      {filterList.map((filter, index) => (
        <div key={ index }>
          <span>
            {filter.column}
            {' '}
            {filter.comparison}
            {' '}
            {filter.amount}
            {' '}
          </span>

          <button
            type="button"
            data-testid="filter"
            className="removeBtn"
          >
            limpar
          </button>
        </div>
      ))}
    </div>
  );
}

export default Filters;
