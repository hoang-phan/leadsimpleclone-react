import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import Login from './Login';

test('renders login page', async () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Login />
    </MockedProvider>);
  const linkElement = screen.getByText(/Log in/i);
  expect(linkElement).toBeInTheDocument();
  expect(screen.getByTestId('email-input')).toBeInTheDocument();
  expect(screen.getByTestId('password-input')).toBeInTheDocument();
  expect(screen.getByTestId('login-button')).toBeInTheDocument();
});
