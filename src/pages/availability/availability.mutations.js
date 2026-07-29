import { gql } from "@apollo/client";

// Mirrors backend: Mutation { addAvailability(date, startTime, endTime): Availability! }
export const ADD_AVAILABILITY_MUTATION = gql`
  mutation AddAvailability($date: String!, $startTime: String!, $endTime: String!) {
    addAvailability(date: $date, startTime: $startTime, endTime: $endTime) {
      id
      date
      startTime
      endTime
    }
  }
`;
