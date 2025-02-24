import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          name
          description
          ownerName
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_AUTHENTICATED_USER = gql`
  query {
    me {
      id
      username
    }
  }`

