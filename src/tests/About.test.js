import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

beforeEach(() => {
  renderWithRouter(<About />);
});

describe('Teste se a página contém as informações sobre a Pokédex;', () => {
  it('Se contém o Título About Pokédex', () => {
    const title = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Se contém texto de descrição 1', () => {
    const description = screen.getByText('This application', { exact: false });
    expect(description).toBeInTheDocument();
  });

  it('Se contém texto de descrição 2', () => {
    const description = screen.getByText('One can filter', { exact: false });
    expect(description).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const link = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', link);
    expect(img).toHaveAttribute('alt', 'Pokédex');
  });
});
