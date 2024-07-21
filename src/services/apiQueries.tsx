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

export const SEARCH_CONTACTS_QUERY = gql`
  query searchContacts($filter: String) {
    contacts(first: 20, filter: $filter) {
      edges {
        node {
          id
          firstName
          lastName
          companyName
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

export const GET_LEADS_QUERY = gql`
  {
    leads(first: 20) {
      edges {
        node {
          id
          name
          emailsSent
          callsMade
          contacts {
            id
            firstName
            lastName
            companyName
          }
          stage {
            id
            name
            color
          }
          assignee {
            id
            email
          }
          createdAt
        }
      }
    }
  }
`;

export const SAVE_LEAD_QUERY = gql`
  mutation saveLead(
    $id: ID,
    $name: String!,
    $contacts: [ContactInput!]
    $assignee: UserInput!,
    $stage: StageInput!
  ) {
    saveLead(input: {
      id: $id,
      name: $name,
      contacts: $contacts,
      assignee: $assignee,
      stage: $stage
    }) {
      id
    }
  }
`;

export const DELETE_LEAD_QUERY = gql`
  mutation deleteLeads(
    $ids: [ID!]!
  ) {
    deleteLeads(input: {
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

export const GET_USERS_QUERY = gql`
  {
    users {
      id
      email
    }
  }
`;

export const GET_STAGES_QUERY = gql`
  {
    stages {
      id
      name
      color
    }
  }
`;
