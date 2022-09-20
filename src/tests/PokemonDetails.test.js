import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
  const link = screen.getByRole('link', { name: /more details/i });
  userEvent.click(link);
});

describe('Teste se as informações detalhadas do pokémon selecionado', () => {
  it('A página deve conter um texto <name> Details', () => {
    const title = screen.getByRole('heading', { name: /pikachu details/i });

    expect(title).toBeInTheDocument();
  });

  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    const sumary = screen.getByRole('heading', { name: /summary/i });

    expect(sumary).toBeInTheDocument();
  });

  it('É exibido na tela um h2 com o texto Game Locations of <name>', () => {
    const gameLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });

    expect(gameLocations).toBeInTheDocument();
  });

  it('É exibido na tela uma label com o texto Pokémon favoritado?', () => {
    const favorited = screen.getByText(/pokémon favoritado\?/i);

    expect(favorited).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com os mapas', () => {
  it('Todas as localizações do pokémon devem ser mostradas na seção de detalhes', () => {
    const maps = screen.getAllByAltText('Pikachu location');

    expect(maps.length).toBe(2);
  });

  it('A imagem da localização deve ter um atributo src da localização', () => {
    const map = screen.getAllByAltText('Pikachu location');
    const link1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const link2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

    expect(map[0]).toHaveAttribute('src', link1);
    expect(map[1]).toHaveAttribute('src', link2);
  });
});
