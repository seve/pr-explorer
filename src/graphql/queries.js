import gql from 'graphql-tag';

export default gql`
query GetPR($users: [ID!]!){
  nodes(ids:$users){
    ... on User {
      login,
      id,
      pullRequests(orderBy:{field: CREATED_AT, direction: DESC}, first: 20) {
        nodes{
          permalink,
          createdAt
        }
      }
    }
  }
}
`;
