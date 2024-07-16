import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { LOGIN_QUERY, GET_CONTACTS_QUERY } from './services/apiQueries';
import App from './App';

const mocks = [{
  request: {
    query: LOGIN_QUERY,
    variables: {
      email: "test@login.com",
      password: "passworD",
    }
  },
  result: {
    data: {
      login: { token: "12345", error: null }
    }
  }
},
{
  request: {
    query: GET_CONTACTS_QUERY,
    variables: {}
  },
  result: {
    data: {
      contacts: {
        edges: [{
          node: {
            id: '1',
            firstName: 'John',
            lastName: 'Carpenter',
            companyName: 'JC Company',
            source: { name: 'Email Lead' },
            emails: [{ value: 'john.cap@jc.com' }],
            phones: [{ value: '12345678' }],
            createdAt: '12/12/24',
          }
        }]
      }
    }
  }
}];

test('logins and views contacts', async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>);
  const linkElement = screen.getByText(/Log in/i);
  expect(linkElement).toBeInTheDocument();

  await userEvent.type(screen.getByTestId('email-input'), 'test@login.com');
  await userEvent.type(screen.getByTestId('password-input'), 'passworD');
  await userEvent.click(screen.getByTestId('login-button'))

  await screen.findByText('Contacts');
  await screen.findByText('John');
  expect(screen.getByText('Carpenter')).toBeInTheDocument();
  expect(screen.getByText('JC Company')).toBeInTheDocument();
  expect(screen.getByText('Email Lead')).toBeInTheDocument();
  expect(screen.getByText('john.cap@jc.com')).toBeInTheDocument();
  expect(screen.getByText('12345678')).toBeInTheDocument();
  expect(screen.getByText('12/12/24')).toBeInTheDocument();
});
