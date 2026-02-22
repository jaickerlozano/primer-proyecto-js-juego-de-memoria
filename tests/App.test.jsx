import { describe, it, expect, cleanup } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../src/App';
import React from 'react';

// Basic sanity check
describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Juego de Parejas')).toBeDefined();
    expect(screen.getByText('Iniciar')).toBeDefined();
    expect(screen.getByText('Reiniciar')).toBeDefined();
  });
});
