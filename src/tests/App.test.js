import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toBeInTheDocument();
  });

  it('O segundo link deve possuir o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(link).toBeInTheDocument();
  });

  it(`Se a aplicação é redirecionada para a página inicial, na URL / ao 
      clicar no link Home da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'Home' });
    userEvent.click(link);
    expect(history.location.pathname).toBe('/');
  });

  describe('Teste se a aplicação é redirecionada para a página de About', () => {
    it('na URL /about, ao clicar no link About da barra de navegação', () => {
      const { history } = renderWithRouter(<App />);
      const link = screen.getByRole('link', { name: 'About' });
      userEvent.click(link);
      expect(history.location.pathname).toBe('/about');
    });
  });

  describe(
    'Teste se a aplicação é redirecionada para a página de Pokémons Favoritados',
    () => {
      it(
        'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação',
        () => {
          const { history } = renderWithRouter(<App />);
          const link = screen.getByRole('link', { name: 'Favorite Pokémons' });
          userEvent.click(link);
          expect(history.location.pathname).toBe('/favorites');
        },
      );
    },
  );

  describe('Teste se a aplicação é redirecionada para a página Not Found', () => {
    it('ao entrar em uma URL desconhecida', () => {
      const { history } = renderWithRouter(<App />);
      act(() => {
        history.push('/xablau');
      });
      const title = screen.getByRole('heading', {
        name: /Page requested not found/i,
      });
      expect(title).toBeInTheDocument();
    });
  });
});
