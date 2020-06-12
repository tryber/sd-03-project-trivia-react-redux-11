import React from 'react';
import { render } from '@testing-library/react';
import Footer from './components/Footer';

test('VAI COMEÇAR, A CYBER LUTAAAAA... ATÉ CAIR! NÃO PERCA O CONTROLE, E AO TOPO VAMOS SUBIR!', () => {
  const { getByText } = render(<Footer />);
  const linkElement = getByText(/Developed by/i);
  expect(linkElement).toBeInTheDocument();
});
