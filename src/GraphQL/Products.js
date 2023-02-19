import { gql } from "@apollo/client";

export const PRODUCTS = gql`
{
    products{
      id
      title
      description
      price
      date
      category
    }
}
`