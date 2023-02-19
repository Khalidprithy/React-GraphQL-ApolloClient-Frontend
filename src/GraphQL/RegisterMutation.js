import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
mutation($password: String!,
        $email: String!,
        $number: Float!,
        $address: String!,
        $lastName: String!,
        $firstName: String!)
        {
        register(password: $password,
            email: $email,
            number: $number,
            address: $address,
            lastName: $lastName,
            firstName: $firstName)
        }
`