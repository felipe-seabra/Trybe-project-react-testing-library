import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

beforeEach(() => {
  renderWithRouter(<NotFound />);
});

describe('Teste o componente <NotFound.js />', () => {
  it('Se a página contém um heading h2 com o texto Page requested not found', () => {
    const title = screen.getByRole('heading', {
      name: 'Page requested not found', level: 2,
    });
    expect(title).toBeInTheDocument();
  });

  it('Teste se a página mostra a imagem', () => {
    const link = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', link);
  });
});
