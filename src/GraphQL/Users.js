import { gql } from "@apollo/client";

export const USERS = gql`
{
    users{
      id
      email
      firstName
      lastName
    }
}
`