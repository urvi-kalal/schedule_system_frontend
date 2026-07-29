import { gql } from "@apollo/client";

// Mirrors backend: Mutation { register(name, email, password): User! }
export const REGISTER_MUTATION = gql`
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;

// Mirrors backend: Mutation { login(email, password): AuthPayload! }
export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
      name
      email
    }
  }
`;
