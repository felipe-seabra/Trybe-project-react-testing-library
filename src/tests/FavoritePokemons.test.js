import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../pages/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  renderWithRouter(<FavoritePokemons />);
  it('Teste se aparece o título Favorite pokémons', () => {
    const title = screen.getByRole('heading', { name: 'Favorite pokémons', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it(`Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa
      não tenha pokémons favoritos`, () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  // it('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
  //   const { history } = renderWithRouter(<FavoritePokemons />);
  //   act(() => {
  //     history.push('/pokemons/25');
  //   });
  //   const input = screen.getByRole('button');
  //   userEvent.click(input);
  //   act(() => {
  //     history.push('/favorites');
  //   });
  // });
});
