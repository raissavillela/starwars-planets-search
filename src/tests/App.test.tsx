import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App';
import PlanetsProvider from '../context/PlanetsProvider';
import { mockData } from './mockData';

const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => mockData,
  } as Response;
  
  describe('Table', () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    test('Verifica se Table renderiza.', async () => {
      const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
      render(<PlanetsProvider><App /></PlanetsProvider>);
  
      const planetsName = await screen.findAllByTestId('planet-name');
      expect(planetsName[0]).toBeInTheDocument();
  
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(mockData.results.length).toBe(10);
    });
  });
  
  describe('FilterPlanetName', () => {
    beforeEach(() => {
      vi.spyOn(global, 'fetch').mockResolvedValue(MOCK_RESPONSE);
    });
  
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    it('1Verifica filtro por nome', async () => {
      render(<PlanetsProvider><App /></PlanetsProvider>);
  
      const inputName = screen.getByTestId('name-filter');
      expect(inputName).toBeInTheDocument();
  
      await userEvent.type(inputName, 'oo');
  
      expect(await screen.findByText('Tatooine')).toBeInTheDocument();
      expect(await screen.findByText('Naboo')).toBeInTheDocument();
      expect(await screen.queryByText('Alderaan')).not.toBeInTheDocument();
    });
  
    it('Verifica filtro por números.', async () => {
      render(<PlanetsProvider><App /></PlanetsProvider>);
  
      const inputColumn = screen.getByTestId('column-filter');
      const inputComparison = screen.getByTestId('comparison-filter');
      const inputAmount = screen.getByTestId('value-filter');
      const buttonFilter = screen.getByTestId('button-filter');
  
      let planetsName = await screen.findAllByTestId('planet-name');
  
      await userEvent.selectOptions(inputColumn, 'population');
      await userEvent.selectOptions(inputComparison, 'maior que');
      await userEvent.type(inputAmount, '200000');
      await userEvent.click(buttonFilter);
  
      planetsName = await screen.findAllByTestId('planet-name');
  
      expect(planetsName.length).toBe(6);
      expect(inputColumn).toHaveValue('orbital_period');
  
      await userEvent.selectOptions(inputColumn, 'orbital_period');
      await userEvent.selectOptions(inputComparison, 'menor que');
      await userEvent.type(inputAmount, '463');
      await userEvent.click(buttonFilter);
  
      planetsName = await screen.findAllByTestId('planet-name');
  
      expect(planetsName.length).toBe(4);
      expect(inputColumn).toHaveValue('diameter');
  
      await userEvent.selectOptions(inputColumn, 'diameter');
      await userEvent.selectOptions(inputComparison, 'igual a');
      await userEvent.type(inputAmount, '4900');
      await userEvent.click(buttonFilter);
  
      planetsName = await screen.findAllByTestId('planet-name');
  
      expect(planetsName.length).toBe(1);
      expect(inputColumn).toHaveValue('rotation_period');
    });
  
    it('Verifica botões de excluir filtros.', async () => {
      render(<PlanetsProvider><App /></PlanetsProvider>);
  
      const inputColumn = screen.getByTestId('column-filter');
      const inputComparison = screen.getByTestId('comparison-filter');
      const inputAmount = screen.getByTestId('value-filter');
      const buttonFilter = screen.getByTestId('button-filter');
  
      await userEvent.selectOptions(inputColumn, 'population');
      await userEvent.selectOptions(inputComparison, 'maior que');
      await userEvent.type(inputAmount, '200000');
      await userEvent.click(buttonFilter);
  
      await userEvent.selectOptions(inputColumn, 'orbital_period');
      await userEvent.selectOptions(inputComparison, 'menor que');
      await userEvent.type(inputAmount, '463');
      await userEvent.click(buttonFilter);
  
      let butonRemoveFilter = await screen.findAllByTestId('button-remove-filter');
      expect(butonRemoveFilter.length).toBe(2);
      await userEvent.click(butonRemoveFilter[0]);
  
      butonRemoveFilter = await screen.findAllByTestId('button-remove-filter');
      expect(butonRemoveFilter.length).toBe(1);
    });
  
    it('Verifica o botão Remover todas filtragens.', async () => {
      render(<PlanetsProvider><App /></PlanetsProvider>);
  
      const inputColumn = screen.getByTestId('column-filter');
      const inputComparison = screen.getByTestId('comparison-filter');
      const inputAmount = screen.getByTestId('value-filter');
      const buttonFilter = screen.getByTestId('button-filter');
  
      await userEvent.selectOptions(inputColumn, 'population');
      await userEvent.selectOptions(inputComparison, 'maior que');
      await userEvent.type(inputAmount, '200000');
      await userEvent.click(buttonFilter);
  
      await userEvent.selectOptions(inputColumn, 'orbital_period');
      await userEvent.selectOptions(inputComparison, 'menor que');
      await userEvent.type(inputAmount, '463');
      await userEvent.click(buttonFilter);
  
      const buttonRemoveFilters = await screen.findByRole('button', { name: /remover todas filtragens/i });
      await userEvent.click(buttonRemoveFilters);
      expect(screen.queryByTestId('filter')).not.toBeInTheDocument();
    });
  
    it('Verifica filtro por ordem crescente ou decrescente', async () => {
      render(<PlanetsProvider><App /></PlanetsProvider>);
  
      const inputColumn = screen.getByTestId('column-sort');
      const inputAsc = screen.getByTestId('column-sort-input-asc');
      const inputDes = screen.getByTestId('column-sort-input-desc');
      const buttonSort = screen.getByTestId('column-sort-button');
  
      await userEvent.selectOptions(inputColumn, 'population');
      await userEvent.click(inputDes);
      await userEvent.click(buttonSort);
  
      let planetsName = await screen.findAllByTestId('planet-name');
      expect(planetsName[0]).toHaveTextContent('Coruscant');
  
      await userEvent.selectOptions(inputColumn, 'diameter');
      await userEvent.click(inputAsc);
      await userEvent.click(buttonSort);
  
      planetsName = await screen.findAllByTestId('planet-name');
      expect(planetsName[0]).toHaveTextContent('Endor');
    });
  });