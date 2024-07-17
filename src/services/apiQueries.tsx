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
            id
            value
            kind
          }
          phones {
            id
            value
            kind
          }
          createdAt
        }
      }
    }
  }
`;

export const CREATE_OR_UPDATE_CONTACT_QUERY = gql`
  mutation createOrUpdateContact(
    $id: ID,
    $firstName: String!,
    $lastName: String!,
    $companyName: String,
    $emails: [EmailInput!],
    $phones: [PhoneInput!],
    $sourceId: ID
  ) {
    createOrUpdateContact(input: {
      id: $id,
      firstName: $firstName,
      lastName: $lastName,
      companyName: $companyName,
      emails: $emails,
      phones: $phones,
      sourceId: $sourceId
    }) {
      id
    }
  }
`;

export const LOGIN_QUERY = gql`
  mutation login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      email
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

export function useSaveContact() {
  return useMutation(CREATE_OR_UPDATE_CONTACT_QUERY);
}
