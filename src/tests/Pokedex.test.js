import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Teste se o card do pokémon indicado na Pokédex contém um link', () => {
  it('O link deve possuir a URL /pokemons/<id>', () => {
    const link = screen.getByRole('link', { name: /more details/i });

    const id = '/pokemons/25';
    expect(link).toHaveAttribute('href', id);
  });
});

describe('Teste se ao clicar no link de navegação do pokémon', () => {
  it('Redirecionamento da aplicação para a página de detalhes de pokémon', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const title = screen.getByRole('heading', { name: /pikachu details/i });

    expect(title).toBeInTheDocument();
  });
});

describe(`Se é exibido o próximo pokémon da lista quando o botão Próximo pokémon
  é clicado`, () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    const button = screen.getByRole('button', { name: 'Próximo pokémon' });

    expect(button).toBeInTheDocument();
  });

  it('É possível clicar no botão de filtragem All', () => {
    const buttonAll = screen.getByRole('button', { name: /all/i });

    expect(buttonAll).toBeInTheDocument();
    userEvent.click(buttonAll);
  });
});

// stryker
it('Se tem a quantidade correta de botões', () => {
  const qtdButons = 7;
  const buttons = screen.getAllByTestId('pokemon-type-button');
  expect(buttons.length).toBe(qtdButons);
});

it('Se o texto corresponde ao tipo', () => {
  const buttons = screen.getByRole('button', { name: /fire/i });
  userEvent.click(buttons);

  const type = screen.getAllByTestId('pokemon-type');
  expect(type[0].textContent).toBe('Fire');
});
