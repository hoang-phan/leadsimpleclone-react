import { gql, useQuery, useMutation } from '@apollo/client';

export const GET_CONTACTS_QUERY = gql`
  {
    contacts(first: 20) {
      edges {
        node {
          id
          firstName
          lastName
          companyName
          source {
            name
          }
          emails {
            value
          }
          phones {
            value
          }
          createdAt
        }
      }
    }
  }
`;

export const LOGIN_QUERY = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      error
    }
  }
`;
  

export function useGetContacts() {
  return useQuery(GET_CONTACTS_QUERY);
}

export function useLogin() {
  return useMutation(LOGIN_QUERY);
}
