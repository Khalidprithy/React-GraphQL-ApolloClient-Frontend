import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
mutation($password: String!, $email: String!){
    login(password: $password, email: $email) {
      accessToken
    }
  }
`