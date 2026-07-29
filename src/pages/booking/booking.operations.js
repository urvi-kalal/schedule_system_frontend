import { gql } from "@apollo/client";

// Mirrors backend: Query { getBookingLink(code): BookingLink! }
export const GET_BOOKING_LINK_QUERY = gql`
  query GetBookingLink($code: String!) {
    getBookingLink(code: $code) {
      id
      code
      url
      availableDates
      user {
        id
        name
        email
      }
    }
  }
`;

// Mirrors backend: Query { getAvailableSlots(code, date): [TimeSlot!]! }
export const GET_AVAILABLE_SLOTS_QUERY = gql`
  query GetAvailableSlots($code: String!, $date: String!) {
    getAvailableSlots(code: $code, date: $date) {
      startTime
      endTime
    }
  }
`;

// Mirrors backend: Mutation { createBooking(...): Booking! }
export const CREATE_BOOKING_MUTATION = gql`
  mutation CreateBooking(
    $code: String!
    $date: String!
    $startTime: String!
    $endTime: String!
    $attendeeName: String
    $attendeeEmail: String
  ) {
    createBooking(
      code: $code
      date: $date
      startTime: $startTime
      endTime: $endTime
      attendeeName: $attendeeName
      attendeeEmail: $attendeeEmail
    ) {
      id
      date
      startTime
      endTime
      attendeeName
      attendeeEmail
    }
  }
`;
