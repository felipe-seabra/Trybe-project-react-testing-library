import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
});

describe('Se é renderizado um card com as informações de determinado pokémon:', () => {
  // it('O nome correto do pokémon deve ser mostrado na tela', () => {
  //   const getNamePokemon = screen.getByTestId('pokemon-name');
  //   expect(getNamePokemon).toHaveTextContent(/Pikachu/i);
  // });

  it('O tipo correto do pokémon deve ser mostrado na tela', () => {
    const typePokemon = screen.getByTestId('pokemon-type');

    expect(typePokemon).toHaveTextContent(/Electric/i);
  });

  it('O peso médio do pokémon deve ser exibido', () => {
    const text = 'Average weight: 6.0 kg';
    const weightPokemon = screen.getByTestId('pokemon-weight');

    expect(weightPokemon).toHaveTextContent(text);
  });

  it('A imagem do pokémon deve ser exibida', () => {
    const link = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const getNamePokemon = screen.getByTestId('pokemon-name');
    const namePokemon = `${getNamePokemon.textContent} sprite`;
    const img = screen.getByRole('img');

    expect(img).toHaveAttribute('src', link);
    expect(img).toHaveAttribute('alt', namePokemon);
  });
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

  // it('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const link = screen.getByRole('link', { name: /more details/i });
  //   userEvent.click(link);
  //   expect(history.location.pathname).toBe('/pokemons/25');
  // });
});

describe('Teste se existe um ícone de estrela nos pokémons favoritados', () => {
  it('Imagem com o atributo src contendo o caminho /star-icon.svg e o alt', () => {
    const link = screen.getByRole('link', { name: /more details/i });
    userEvent.click(link);
    const favorite = screen.getByText(/pokémon favoritado\?/i);
    userEvent.click(favorite);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const star = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    const getNamePokemon = screen.getByTestId('pokemon-name');

    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star)
      .toHaveAttribute('alt', `${getNamePokemon.textContent} is marked as favorite`);
  });
  it('', () => {});
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
