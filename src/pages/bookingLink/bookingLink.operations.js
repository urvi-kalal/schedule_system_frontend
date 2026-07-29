import { gql } from "@apollo/client";

// Mirrors backend: Mutation { generateBookingLink: BookingLink! }
export const GENERATE_BOOKING_LINK_MUTATION = gql`
  mutation GenerateBookingLink {
    generateBookingLink {
      id
      code
      url
      availableDates
      createdAt
    }
  }
`;

// Mirrors backend: Query { getBookingLink(code: String!): BookingLink! }
export const GET_BOOKING_LINK_QUERY = gql`
  query GetBookingLink($code: String!) {
    getBookingLink(code: $code) {
      id
      code
      url
      availableDates
      createdAt
    }
  }
`;
