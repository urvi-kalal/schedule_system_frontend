import { gql } from "@apollo/client";

export const GET_MY_BOOKINGS_QUERY = gql`
  query GetMyBookings {
    getMyBookings {
      id
      date
      startTime
      endTime
      attendeeName
      attendeeEmail
    }
  }
`;
