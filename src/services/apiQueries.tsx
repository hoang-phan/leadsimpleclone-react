import { gql } from '@apollo/client';

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

export const SAVE_CONTACT_QUERY = gql`
  mutation saveContact(
    $id: ID,
    $firstName: String!,
    $lastName: String!,
    $companyName: String,
    $emails: [EmailInput!],
    $phones: [PhoneInput!],
    $sourceId: ID
  ) {
    saveContact(input: {
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

export const DELETE_CONTACT_QUERY = gql`
  mutation deleteContacts(
    $ids: [ID!]!
  ) {
    deleteContacts(input: {
      ids: $ids,
    }) {
      success
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
