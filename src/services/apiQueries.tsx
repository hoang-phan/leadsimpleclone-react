import { gql, useQuery, useMutation } from '@apollo/client';

export function useGetContacts() {
  return useQuery(gql`
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
  `);
}

export function useLogin() {
  return useMutation(
    gql`
      mutation login($email: String!, $password: String!) {
        login(input: { email: $email, password: $password }) {
          token
          error
        }
      }
    `
  );
}
