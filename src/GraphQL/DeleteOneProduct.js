import { gql } from "@apollo/client";

export const DELETE_PRODUCT = gql`
mutation($deleteProductId: Float!){
    deleteProduct(id: $deleteProductId)
  }
`