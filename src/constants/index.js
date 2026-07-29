// App-wide constants — mirrors backend constants/messages.js
export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Logged in successfully.",
  REGISTER_SUCCESS: "Account created successfully.",
  LOGOUT_SUCCESS: "Logged out successfully.",
  NO_TOKEN: "Authentication required.",
};

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  AVAILABILITY: "/dashboard/availability",
  BOOKING_LINKS: "/dashboard/booking-links",
  BOOK: "/book/:code",
  BOOKING_CONFIRMED: "/booking-confirmed",
};
